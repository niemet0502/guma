import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NotificationsService {
  private url = 'http://data-access:3000/notifications/';

  constructor(private readonly http: HttpService) {}

  async findAllByUser(user_id: number): Promise<Notification[]> {
    const { data } = await firstValueFrom(
      this.http.get<Notification[]>(this.url, { params: { user_id } }),
    );
    return data;
  }

  async findOne(id: number): Promise<Notification> {
    const { data } = await firstValueFrom(
      this.http.get<Notification>(`${this.url}${id}`),
    );
    return data;
  }
}
