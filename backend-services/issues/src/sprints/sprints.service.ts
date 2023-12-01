import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { TasksService } from 'src/tasks/tasks.service';
import { CompleteSprintInput } from './dto/complete-sprint.input';
import { CreateSprintInput } from './dto/create-sprint.input';
import { UpdateSprintInput } from './dto/update-sprint.input';
import { Sprint } from './entities/sprint.entity';

@Injectable()
export class SprintsService {
  private url = 'http://localhost:5002/sprints/';

  constructor(
    private readonly http: HttpService,
    @Inject(forwardRef(() => TasksService))
    private readonly taskServie: TasksService,
  ) {}

  async create(createSprintInput: CreateSprintInput): Promise<Sprint> {
    const { data } = await firstValueFrom(
      this.http.post<Sprint>(this.url, createSprintInput).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async findAllByTeam(team_id: number): Promise<Sprint[]> {
    const { data } = await firstValueFrom(
      this.http.get<Sprint[]>(this.url, {
        params: { team_id },
      }),
    );
    return data;
  }

  async findOne(id: number): Promise<Sprint> {
    const { data } = await firstValueFrom(
      this.http.get<Sprint>(this.url + id).pipe(
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
    updateSprintInput: UpdateSprintInput,
  ): Promise<Sprint> {
    const { data } = await firstValueFrom(
      this.http.patch<Sprint>(`${this.url}${id}`, updateSprintInput),
    );
    return data;
  }

  async complete(
    id: number,
    completeSprintInput: CompleteSprintInput,
  ): Promise<Sprint> {
    delete completeSprintInput.id;

    const { data } = await firstValueFrom(
      this.http.post<Sprint>(`${this.url}complete/${id}`, completeSprintInput),
    );
    return data;
  }

  async getTasks(sprintId: number) {
    return await this.taskServie.findAll(
      undefined,
      undefined,
      undefined,
      undefined,
      sprintId,
      undefined,
    );
  }

  async getUncompletedTasks(sprintId: number) {
    console.log(sprintId);

    return await this.taskServie.findAll(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      sprintId,
    );
  }
}
