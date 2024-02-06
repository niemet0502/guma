import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateReminderInput } from './dto/create-reminder.input';
import { UpdateReminderInput } from './dto/update-reminder.input';
import { Reminder } from './entities/reminder.entity';

@Injectable()
export class RemindersService {
  private url = 'http://data-access:3000/reminders/';

  constructor(
    private readonly http: HttpService,
    @Inject(forwardRef(() => TasksService))
    private readonly tasksService: TasksService,
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

  async findAll(task_id?: number): Promise<Reminder[]> {
    const { data } = await firstValueFrom(
      this.http.get<Reminder[]>(this.url, {
        params: {
          task_id,
        },
      }),
    );
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

  async getTask(id: number) {
    return await this.tasksService.findOne(id);
  }
}
