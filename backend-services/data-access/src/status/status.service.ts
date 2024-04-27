import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { TeamsService } from '../teams/teams.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { TaskStatus } from './entities/status.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(TaskStatus) private repo: Repository<TaskStatus>,
    @Inject(forwardRef(() => TeamsService))
    private readonly teamService: TeamsService,
  ) {}

  async create(createTaskStatusDto: CreateStatusDto): Promise<TaskStatus> {
    const { name, team_id } = createTaskStatusDto;

    const team = team_id ? await this.teamService.findOne(+team_id) : undefined;

    if (!team && team_id) {
      throw new NotFoundException('Team not found');
    }

    const taskStatus = await this.repo.findOne({
      where: { name: name },
    });

    if (taskStatus && taskStatus.team_id) {
      const errors = { message: 'The name is already in use' };
      throw new HttpException({ errors }, 404);
    }

    return await this.repo.save(createTaskStatusDto);
  }

  async findAll(team_id?: string): Promise<TaskStatus[]> {
    const team = team_id ? await this.teamService.findOne(+team_id) : undefined;

    if (!team && team_id) {
      throw new NotFoundException('Team not found');
    }

    return await this.repo.find({
      where: [team_id && { team_id: +team_id }, { team_id: IsNull() }],
      order: { state: 'ASC' },
    });
  }

  async findOne(id: number): Promise<TaskStatus> {
    return await this.repo.findOne({ where: { id } });
  }

  async update(id: number, updateOrganizationDto: UpdateStatusDto) {
    const toUpdate = await this.repo.findOne({
      where: { id },
    });

    const updated = Object.assign(toUpdate, updateOrganizationDto);

    return await this.repo.save(updated);
  }

  async remove(id: number): Promise<TaskStatus> {
    const orga = await this.repo.findOne({ where: { id } });

    if (!orga) {
      throw new NotFoundException('TaskStatus not found');
    }

    // remove all workflow related to the

    return await this.repo.remove(orga);
  }

  async findBy(option: any): Promise<TaskStatus> {
    return await this.repo.findOne(option);
  }
}
