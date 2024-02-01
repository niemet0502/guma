import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Task } from '../tasks/entities/task.entity';
import { TasksService } from '../tasks/tasks.service';
import { CreateReminderInput } from './dto/create-reminder.input';
import { UpdateReminderInput } from './dto/update-reminder.input';
import { Reminder } from './entities/reminder.entity';

@Injectable()
export class RemindersService {
  private url = 'http://data-access:3000/reminders/';

  constructor(
    private readonly http: HttpService,
    private readonly taskService: TasksService,
  ) {}

  async create(createReminderInput: CreateReminderInput): Promise<Reminder> {
    const { data } = await firstValueFrom(
      this.http.post<Reminder>(this.url, createReminderInput).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );

    return data;
  }

  async findAll(): Promise<Reminder[]> {
    const { data } = await firstValueFrom(this.http.get<Reminder[]>(this.url));
    return data;
  }

  async findOne(id: number): Promise<Reminder> {
    const { data } = await firstValueFrom(
      this.http.get<Reminder>(this.url + id).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async update(
    id: number,
    updateReminderInput: UpdateReminderInput,
  ): Promise<Reminder> {
    const { data } = await firstValueFrom(
      this.http.patch<Reminder>(`${this.url}${id}`, updateReminderInput).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async remove(id: number): Promise<Reminder> {
    const { data } = await firstValueFrom(
      this.http.delete<Reminder>(`${this.url}${id}`),
    );
    return { id, ...data };
  }

  async getTask(id: number): Promise<Task> {
    return await this.taskService.findOne(id);
  }
}
