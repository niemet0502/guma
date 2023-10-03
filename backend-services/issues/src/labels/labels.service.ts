import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateTaskLabelInput } from './dto/create-label.input';
import { TaskLabel } from './entities/label.entity';

@Injectable()
export class LabelsService {
  private url = 'http://localhost:5002/tasklabels/';

  constructor(private http: HttpService) {}
  //private taskService: TasksService,

  async create(createLabelInput: CreateTaskLabelInput): Promise<TaskLabel> {
    const { data } = await firstValueFrom(
      this.http.post<TaskLabel>(this.url, createLabelInput),
    );
    return data;
  }

  async findAllByTask(task_id: number): Promise<TaskLabel[]> {
    const { data } = await firstValueFrom(
      this.http.get<TaskLabel[]>(this.url, {
        params: { task_id },
      }),
    );
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} label`;
  }

  remove(id: number) {
    return `This action removes a #${id} label`;
  }

  // async getTask(id: number): Promise<Task> {
  //   return await this.taskService.findOne(id);
  // }
}
