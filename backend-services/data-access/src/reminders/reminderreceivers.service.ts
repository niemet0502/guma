import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReminderReceiversDto } from './dto/create-reminderreceivers.dto';
import { ReminderReceiversIds } from './entities/reminderusers.entity';
import { RemindersService } from './reminders.service';

@Injectable()
export class ReminderReceiversService {
  constructor(
    @InjectRepository(ReminderReceiversIds)
    private repository: Repository<ReminderReceiversIds>,
    private readonly reminderService: RemindersService,
  ) {}

  async create(
    createTaskLbelDto: CreateReminderReceiversDto,
  ): Promise<ReminderReceiversIds> {
    const { user_id, reminder_id } = createTaskLbelDto;

    const reminder = await this.reminderService.findOne(reminder_id);

    if (!reminder) {
      throw new NotFoundException('Reminder not found');
    }

    return await this.repository.save(createTaskLbelDto);
  }

  async remove(id: number): Promise<ReminderReceiversIds> {
    const userreminder = await this.repository.findOne({ where: { id } });

    if (!userreminder) {
      throw new NotFoundException("User's reminder not found");
    }

    return await this.repository.remove(userreminder);
  }

  async findAllByReminder(reminder_id): Promise<ReminderReceiversIds[]> {
    return await this.repository.find({ where: { reminder_id } });
  }
}
