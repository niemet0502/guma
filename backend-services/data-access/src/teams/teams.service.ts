import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomLogger } from '../logger/custom-logger.service';
import { ProjectsService } from '../organizations/organizations.service';
import { StatusService } from '../status/status.service';
import { WorkflowService } from '../workflow/workflow.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private repo: Repository<Team>,
    private readonly organizationService: ProjectsService,
    @Inject(forwardRef(() => WorkflowService))
    private readonly workflowService: WorkflowService,
    @Inject(forwardRef(() => StatusService))
    private readonly statusService: StatusService,
    private logger: CustomLogger,
  ) {
    this.logger.setContext('TeamsService');
  }
  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const { name, project_id } = createTeamDto;

    this.logger.log(
      { message: 'Creating team', data: { name, project_id } },
      'create',
    );

    const orga = await this.organizationService.findOne(+project_id);

    if (!orga) {
      this.logger.error(
        `Organization not found for id: ${project_id}`,
        'create',
      );
      throw new NotFoundException('Organization not found');
    }

    const team = await this.repo.findOne({ where: { name, project_id } });

    if (team) {
      this.logger.error(`Team name already in use: ${name}`, 'create');
      throw new BadRequestException('The name is already in use');
    }

    const createdTeam = await this.repo.save(createTeamDto);
    this.logger.log(
      { message: 'Team successfully created', data: createdTeam },
      'create',
    );

    // created the default workflow for the team
    const statuses = await this.statusService.findAll(
      createdTeam.id.toString(),
    );

    statuses.map(
      async (status, i) =>
        await this.workflowService.create({
          team_id: createdTeam.id,
          status_id: status.id,
          order_value: i++,
        }),
    );

    return createdTeam;
  }

  async findAllByProject(project_id: number): Promise<Team[]> {
    const orga = await this.organizationService.findOne(+project_id);

    this.logger.log(`Find teams by project ${project_id}`, 'findAllByProject');

    if (!orga) {
      this.logger.error(
        `Organization not found for id: ${project_id}`,
        'create',
      );
      throw new NotFoundException('Organization not found');
    }

    try {
      return await this.repo.find({ where: { project_id } });
    } catch (e) {
      this.logger.error(
        {
          message: `Error fetching teams by project_id: ${project_id}`,
          data: e.stack,
        },
        'findOne',
      );
      throw e;
    }
  }

  async findOne(id: number): Promise<Team> {
    return await this.repo.findOne({ where: { id } });
  }

  async findByName(name: string, project_id: number): Promise<Team> {
    return await this.repo.findOne({ where: { name, project_id } });
  }

  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const toUpdate = await this.repo.findOne({
      where: { id },
    });

    const updated = Object.assign(toUpdate, updateTeamDto);

    return await this.repo.save(updated);
  }

  async remove(id: number): Promise<Team> {
    const team = await this.repo.findOne({ where: { id } });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    return await this.repo.remove(team);
  }
}
