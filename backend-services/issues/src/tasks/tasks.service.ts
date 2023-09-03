import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { removeSpacesAndSpecialChars } from 'src/utils/Helper';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private url = 'http://neka-data-access-1:3000/tasks/';

  constructor(private readonly http: HttpService) {}

  async create(createTaskInput: CreateTaskInput) {
    const { name } = createTaskInput;

    const { data } = await firstValueFrom(
      this.http.post<Task>(this.url, {
        ...createTaskInput,
        slug: removeSpacesAndSpecialChars(name),
      }),
    );
    return data;
  }

  async findAll(
    team_id: number,
    type: number,
    status_id: number,
    parent_task_id: number,
  ): Promise<Task[]> {
    const { data } = await firstValueFrom(
      this.http.get<Task[]>(this.url, {
        params: { team_id, type, status_id, parent_task_id },
      }),
    );
    return data;
  }

  async findOne(id: number) {
    const { data } = await firstValueFrom(this.http.get<Task>(this.url + id));
    return data;
  }

  async update(id: number, updateTaskInput: UpdateTaskInput) {
    const { data } = await firstValueFrom(
      this.http.patch<Task>(`${this.url}${id}`, updateTaskInput),
    );
    return data;
  }

  async remove(id: number) {
    const { data } = await firstValueFrom(
      this.http.delete<Task>(`${this.url}${id}`),
    );
    return { id, ...data };
  }

  async getSubtasks(parent_task_id: number, team_id: number) {
    const { data } = await firstValueFrom(
      this.http.get<Task[]>(this.url, { params: { team_id, parent_task_id } }),
    );
    return data;
  }
}