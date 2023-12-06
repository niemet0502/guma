import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { StatusService } from 'src/status/status.service';
import { WorkflowService } from 'src/workflow/workflow.service';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private repo: Repository<Team>,
    private readonly organizationService: OrganizationsService,
    @Inject(forwardRef(() => WorkflowService))
    private readonly workflowService: WorkflowService,
    @Inject(forwardRef(() => StatusService))
    private readonly statusService: StatusService,
  ) {}
  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const { name, organization_id } = createTeamDto;

    const orga = await this.organizationService.findOne(+organization_id);

    if (!orga) {
      throw new NotFoundException('Organization not found');
    }

    const team = await this.repo.findOne({ where: { name, organization_id } });

    if (team) {
      throw new BadRequestException('The name is already in use');
    }

    const createdTeam = await this.repo.save(createTeamDto);

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

  async findAllByOrganization(organization_id: number): Promise<Team[]> {
    const orga = await this.organizationService.findOne(+organization_id);

    if (!orga) {
      throw new NotFoundException('Organization not found');
    }

    return await this.repo.find({ where: { organization_id } });
  }

  async findOne(id: number): Promise<Team> {
    return await this.repo.findOne({ where: { id } });
  }

  async findByName(name: string, organization_id: number): Promise<Team> {
    return await this.repo.findOne({ where: { name, organization_id } });
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
