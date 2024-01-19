import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { LivrablesService } from 'src/livrables/livrables.service';
import { ActivitiesService } from '../activities/activities.service';
import { CommentsService } from '../comments/comments.service';
import { LabelsService } from '../labels/labels.service';
import { SprintsService } from '../sprints/sprints.service';
import { removeSpacesAndSpecialChars } from '../utils/Helper';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private url = 'http://data-access:3000/tasks/';

  constructor(
    private readonly http: HttpService,
    private readonly commentService: CommentsService,
    @Inject(forwardRef(() => ActivitiesService))
    private readonly activityService: ActivitiesService,
    private readonly labelService: LabelsService,
    private readonly sprintService: SprintsService,
    private readonly livrableService: LivrablesService,
  ) {}

  async create(createTaskInput: CreateTaskInput) {
    const { name, labels } = createTaskInput;

    const { data } = await firstValueFrom(
      this.http
        .post<Task>(this.url, {
          ...createTaskInput,
          slug: removeSpacesAndSpecialChars(name.trim()).toLowerCase(),
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    // if labels exist created them
    if (labels && labels.length > 0) {
      labels.forEach(
        async (label) =>
          await this.labelService.create({ task_id: data.id, label_id: label }),
      );
    }
    return data;
  }

  async findAll(
    team_id: number,
    type: number,
    status_name: string,
    parent_task_id: number,
    sprint_id: number,
    sprint_history: number,
    sortAsc?: boolean,
    sortBy?: string,
  ): Promise<Task[]> {
    const { data } = await firstValueFrom(
      this.http.get<Task[]>(this.url, {
        params: {
          team_id,
          type,
          status_name,
          parent_task_id,
          sprint_id,
          sprint_history,
          sortAsc,
          sortBy,
        },
      }),
    );
    return data;
  }

  async findOne(id: number) {
    const { data } = await firstValueFrom(
      this.http.get<Task>(this.url + id).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async taskBySlugAndTeam(slug: string) {
    const { data } = await firstValueFrom(
      this.http.get<Task>(`${this.url}bySlug/${slug}`).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async update(id: number, updateTaskInput: UpdateTaskInput) {
    const { data } = await firstValueFrom(
      this.http.patch<Task>(`${this.url}${id}`, updateTaskInput).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw 'An error happened!';
        }),
      ),
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
      this.http.get<Task[]>(this.url, {
        params: { team_id, parent_task_id, sortAsc: true },
      }),
    );

    return data;
  }

  async getComments(task_id: number) {
    return await this.commentService.findAll(task_id, undefined);
  }

  async getActivities(task_id: number) {
    return await this.activityService.findAll(task_id);
  }

  async getLabels(task_id: number) {
    return await this.labelService.findAllByTask(task_id);
  }

  async getSprint(sprint_id: number) {
    return await this.sprintService.findOne(sprint_id);
  }

  async getLivrable(livrable_id: number) {
    return await this.livrableService.findOne(livrable_id);
  }
}
