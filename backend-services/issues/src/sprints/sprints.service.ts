import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateSprintInput } from './dto/create-sprint.input';
import { UpdateSprintInput } from './dto/update-sprint.input';
import { Sprint } from './entities/sprint.entity';

@Injectable()
export class SprintsService {
  private url = 'http://neka-data-access-1:3000/sprints/';

  constructor(
    private readonly http: HttpService,
    @Inject(forwardRef(() => TasksService))
    private readonly taskServie: TasksService,
  ) {}

  async create(createSprintInput: CreateSprintInput): Promise<Sprint> {
    const { data } = await firstValueFrom(
      this.http.post<Sprint>(this.url, createSprintInput),
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
    const { data } = await firstValueFrom(this.http.get<Sprint>(this.url + id));
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

  async getTasks(sprintId: number) {
    return await this.taskServie.findAll(
      undefined,
      undefined,
      undefined,
      undefined,
      sprintId,
    );
  }
}
