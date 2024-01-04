import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LabelService } from '../organizations/label.service';
import { CreateTaskLabelDto } from './dto/create-tasklabel.dto';
import { TaskLabel } from './entities/tasklabel.entity';
import { TasksService } from './tasks.service';

@Injectable()
export class TaskLabelService {
  constructor(
    @InjectRepository(TaskLabel)
    private tasklabelRepository: Repository<TaskLabel>,
    private readonly taskService: TasksService,
    private readonly labelService: LabelService,
  ) {}

  async create(createTaskLbelDto: CreateTaskLabelDto): Promise<TaskLabel> {
    const { task_id, label_id } = createTaskLbelDto;

    const task = await this.taskService.findOne(task_id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const label = await this.labelService.findOne(label_id);

    if (!label) {
      throw new NotFoundException('Label not found');
    }

    return await this.tasklabelRepository.save(createTaskLbelDto);
  }

  async remove(id: number): Promise<TaskLabel> {
    const tasklabel = await this.tasklabelRepository.findOne({ where: { id } });

    if (!tasklabel) {
      throw new NotFoundException('Task label not found');
    }

    return await this.tasklabelRepository.remove(tasklabel);
  }

  async findAllByTask(task_id: number): Promise<TaskLabel[]> {
    return await this.tasklabelRepository.find({
      where: { task_id },
    });
  }
}
