import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateActivityInput } from './dto/create-activity.input';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivitiesService {
  private url = 'http://neka-data-access-1:3000/activities/';

  constructor(private readonly http: HttpService) {}

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
}
