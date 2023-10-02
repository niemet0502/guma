import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ActivitiesService } from 'src/activities/activities.service';
import { CommentsService } from 'src/comments/comments.service';
import { removeSpacesAndSpecialChars } from 'src/utils/Helper';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private url = 'http://localhost:5002/tasks/';

  constructor(
    private readonly http: HttpService,
    private readonly commentService: CommentsService,
    @Inject(forwardRef(() => ActivitiesService))
    private readonly activityService: ActivitiesService,
  ) {}

  async create(createTaskInput: CreateTaskInput) {
    const { name } = createTaskInput;

    const { data } = await firstValueFrom(
      this.http.post<Task>(this.url, {
        ...createTaskInput,
        slug: removeSpacesAndSpecialChars(name).toLowerCase(),
      }),
    );
    return data;
  }

  async findAll(
    team_id: number,
    type: number,
    status_id: number,
    parent_task_id: number,
    sprint_id: number,
  ): Promise<Task[]> {
    const { data } = await firstValueFrom(
      this.http.get<Task[]>(this.url, {
        params: { team_id, type, status_id, parent_task_id, sprint_id },
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

  async getComments(task_id: number) {
    return await this.commentService.findAllByTask(task_id);
  }

  async getActivities(task_id: number) {
    return await this.activityService.findAll(task_id);
  }
}
