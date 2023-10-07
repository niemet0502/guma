import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusService } from 'src/teams/status.service';
import { TeamsService } from 'src/teams/teams.service';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskType } from './tasks.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private readonly statusService: StatusService,
    private readonly teamService: TeamsService,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    const { team_id, status_id, parent_task_id } = createTaskDto;

    // check if the team exists
    const team = await this.teamService.findOne(team_id);

    if (!team) {
      throw new NotFoundException("The team doesn't exist ");
    }

    // check if the status exists
    const status = status_id
      ? await this.statusService.findOne(status_id)
      : await this.statusService.findBy({
          where: { name: 'Backlog', team_id },
        });

    if (!status) {
      throw new NotFoundException("The status doesn't exist ");
    }

    // if the parent_task_id exist check if the task exist

    if (parent_task_id) {
      const parent = await this.taskRepository.findOne({
        where: { id: parent_task_id },
      });

      if (!parent) {
        throw new NotFoundException("The parent doesn't exist ");
      }
    }

    const maxId = await this.findMaxId();

    return await this.taskRepository.save({
      ...createTaskDto,
      status_id: status.id,
      identifier: `${team.identifier}-${maxId}`,
      created_at: new Date().toString(),
    });
  }

  async findAll(
    team_id: number,
    type: TaskType,
    status_id: number,
    parent_task_id: number,
    sprint_id: number,
  ): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task');

    if (team_id) {
      query.andWhere('task.team_id = :team_id', { team_id });
    }

    if (status_id) {
      query.andWhere('task.status_id = :status_id', { status_id });
    }

    if (type) {
      query.andWhere('task.type = :type', { type });
    }

    if (parent_task_id) {
      query.andWhere('task.parent_task_id = :parent_task_id', {
        parent_task_id,
      });
    }

    if (sprint_id) {
      query.andWhere('task.sprint_id = :sprint_id', {
        sprint_id,
      });
    }

    query.orderBy('task.id', 'DESC');

    return await query.getMany();
  }

  async findOne(id: number): Promise<Task> {
    return await this.taskRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const toUpdate = await this.taskRepository.findOne({
      where: { id },
    });

    const updated = Object.assign(toUpdate, updateTaskDto);

    return await this.taskRepository.save(updated);
  }

  async remove(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException('task not found');
    }

    return await this.taskRepository.remove(task);
  }

  async findMaxId(): Promise<number> {
    const queryBuilder = this.taskRepository.createQueryBuilder('task');
    queryBuilder.select('MAX(task.id)', 'maxId');

    const result = await queryBuilder.getRawOne();
    const maxId = result?.maxId;

    return maxId ? parseInt(maxId) : 1;
  }
}
