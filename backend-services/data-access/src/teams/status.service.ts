import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { TaskStatus } from './entities/status.entity';
import { TeamsService } from './teams.service';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(TaskStatus) private repo: Repository<TaskStatus>,
    private readonly teamService: TeamsService,
  ) {}

  async create(createTaskStatusDto: CreateStatusDto): Promise<TaskStatus> {
    const { name, team_id } = createTaskStatusDto;

    const team = await this.teamService.findOne(+team_id);

    if (!team) {
      throw new NotFoundException('Organization not found');
    }

    const TaskStatus = await this.repo.findOne({
      where: { name: name, team_id: team_id },
    });

    if (TaskStatus) {
      const errors = { message: 'The name is already in use' };
      throw new HttpException({ errors }, 404);
    }

    return await this.repo.save(createTaskStatusDto);
  }

  async findAll(team_id: number): Promise<TaskStatus[]> {
    const team = await this.teamService.findOne(team_id);

    if (!team) {
      throw new NotFoundException('Organization not found');
    }

    return await this.repo.find({ where: { team_id } });
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
