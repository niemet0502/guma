import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateReminderreceiverInput } from './dto/create-reminderreceiver.input';
import { UpdateReminderreceiverInput } from './dto/update-reminderreceiver.input';
import { ReminderReceiver } from './entities/reminderreceiver.entity';

@Injectable()
export class ReminderreceiversService {
  private url = 'http://data-access:3000/reminderreceivers/';

  constructor(private http: HttpService) {}

  async create(
    createReminderreceiverInput: CreateReminderreceiverInput,
  ): Promise<ReminderReceiver> {
    const { data } = await firstValueFrom(
      this.http.post<ReminderReceiver>(this.url, createReminderreceiverInput),
    );
    return data;
  }

  async findAllByReminder(reminder_id): Promise<ReminderReceiver[]> {
    const { data } = await firstValueFrom(
      this.http.get<ReminderReceiver[]>(this.url, {
        params: { reminder_id },
      }),
    );
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} reminderreceiver`;
  }

  update(id: number, updateReminderreceiverInput: UpdateReminderreceiverInput) {
    return `This action updates a #${id} reminderreceiver`;
  }

  remove(id: number) {
    return `This action removes a #${id} reminderreceiver`;
  }
}
