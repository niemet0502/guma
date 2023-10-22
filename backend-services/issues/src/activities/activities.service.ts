import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { SprintsService } from 'src/sprints/sprints.service';
import { Sprint } from '../sprints/entities/sprint.entity';
import { CreateActivityInput } from './dto/create-activity.input';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivitiesService {
  private url = 'http://localhost:5002/activities/';

  constructor(
    private readonly http: HttpService,
    @Inject(forwardRef(() => SprintsService))
    private readonly sprintService: SprintsService,
  ) {}

  async create(createActivityInput: CreateActivityInput): Promise<Activity> {
    const { data } = await firstValueFrom(
      this.http.post<Activity>(this.url, createActivityInput),
    );
    return data;
  }

  async findAll(task_id: number): Promise<Activity[]> {
    const { data } = await firstValueFrom(
      this.http.get<Activity[]>(this.url, {
        params: { task_id },
      }),
    );
    return data;
  }

  async findOne(id: number): Promise<Activity> {
    const { data } = await firstValueFrom(
      this.http.get<Activity>(this.url + id),
    );
    return data;
  }

  async getSprint(sprint_id: number): Promise<Sprint> {
    return await this.sprintService.findOne(sprint_id);
  }
}
