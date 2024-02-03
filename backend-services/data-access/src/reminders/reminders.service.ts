import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { Reminder } from './entities/reminder.entity';

@Injectable()
export class RemindersService {
  constructor(
    @InjectRepository(Reminder)
    private readonly repository: Repository<Reminder>,
  ) {}

  async create(createReminderDto: CreateReminderDto): Promise<Reminder> {
    return await this.repository.save({
      ...createReminderDto,
      created_at: new Date().toString(),
      send_at: createReminderDto.send_at.toString(),
    });
  }

  async findAll(task_id?: number): Promise<Reminder[]> {
    const query = this.repository.createQueryBuilder('reminder');

    if (task_id) {
      query.andWhere('reminder.task_id = :task_id', { task_id });
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<Reminder> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateReminderDto: UpdateReminderDto,
  ): Promise<Reminder> {
    const toUpdate = await this.repository.findOne({
      where: { id },
    });

    const updated = Object.assign(toUpdate, updateReminderDto);

    return await this.repository.save(updated);
  }

  async remove(id: number): Promise<Reminder> {
    const reminder = await this.repository.findOne({ where: { id } });

    if (!reminder) {
      throw new NotFoundException('reminder not found');
    }

    return await this.repository.remove(reminder);
  }
}
