import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusService } from 'src/status/status.service';
import { Task } from 'src/tasks/entities/task.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { In, Repository } from 'typeorm';
import { TeamsService } from '../teams/teams.service';
import { CompleteSprintDto } from './dto/complete-sprint.dto';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { Sprint } from './entities/sprint.entity';

@Injectable()
export class SprintsService {
  constructor(
    @InjectRepository(Sprint) private sprintRepository: Repository<Sprint>,
    private readonly teamService: TeamsService,
    @Inject(forwardRef(() => TasksService))
    private taskService: TasksService,
    private statusService: StatusService,
  ) {}
  async create(createSprintDto: CreateSprintDto): Promise<Sprint> {
    const { team_id, start_at, end_at } = createSprintDto;

    // check if the team exists
    const team = await this.teamService.findOne(team_id);

    if (!team) {
      throw new NotFoundException("The team doesn't exist ");
    }

    const date_start_at = new Date(start_at);
    const date_end_at = new Date(end_at);

    if (date_end_at <= date_start_at) {
      const errors = {
        message: "The end date can't be greater or equal than the start date",
      };
      throw new BadRequestException(errors);
    }

    return await this.sprintRepository.save({
      ...createSprintDto,
      end_at: date_end_at.toString(),
      start_at: date_start_at.toString(),
    });
  }

  async findAll(team_id: number): Promise<Sprint[]> {
    return await this.sprintRepository.find({
      where: { team_id },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Sprint> {
    return await this.sprintRepository.findOne({ where: { id } });
  }

  async update(id: number, updateSprintDto: UpdateSprintDto): Promise<Sprint> {
    const { start_at, end_at } = updateSprintDto;

    const toUpdate = await this.sprintRepository.findOne({
      where: { id },
    });

    const updated = Object.assign(toUpdate, updateSprintDto);

    const date_start_at = new Date(start_at);
    const date_end_at = new Date(end_at);

    return await this.sprintRepository.save({
      ...updated,
      end_at: start_at ? date_end_at.toString() : toUpdate.end_at,
      start_at: start_at ? date_start_at.toString() : updated.start_at,
    });
  }

  async remove(id: number): Promise<Sprint> {
    const sprint = await this.sprintRepository.findOne({ where: { id } });

    if (!sprint) {
      throw new NotFoundException('task not found');
    }

    return await this.sprintRepository.remove(sprint);
  }

  async complete(
    id: number,
    completeSprintDto: CompleteSprintDto,
  ): Promise<Sprint> {
    const { isCompleted, destination, unCompletedTasksIds } = completeSprintDto;
    const sprint = await this.sprintRepository.findOne({ where: { id } });
    const status = await this.statusService.findBy({
      where: { name: 'Backlog' },
    });

    if (!isCompleted) {
      // move the remaining task
      const tasks = await this.taskService.findAllBy({
        where: { id: In(unCompletedTasksIds) },
      });

      tasks.forEach((task: Task) => {
        task.sprint_id = null;
        (task.sprint_history = sprint.id), (task.status_id = status.id);
      });

      await this.taskService.save(tasks);
    }

    return await this.sprintRepository.save({ ...sprint, isCompleted: true });
  }
}
