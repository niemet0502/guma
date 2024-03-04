import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CustomLogger } from '../logger/custom-logger.service';

@Injectable()
export class NotificationsService {
  private url = 'http://data-access:3000/notifications/';

  constructor(
    private readonly http: HttpService,
    private logger: CustomLogger,
  ) {
    this.logger.setContext('NotificationsService');
  }

  async findAllByUser(user_id: number): Promise<Notification[]> {
    this.logger.log(
      `Fetching notifications for user ${user_id}`,
      'findAllByUser',
    );

    const { data } = await firstValueFrom(
      this.http.get<Notification[]>(this.url, { params: { user_id } }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data, 'findAllByUser');
          throw error.response.data;
        }),
      ),
    );
    return data;
  }

  async findOne(id: number): Promise<Notification> {
    this.logger.log(`Fetching notification for the id ${id}`, 'findOne');

    const { data } = await firstValueFrom(
      this.http.get<Notification>(`${this.url}${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data, 'findOne');
          throw error.response.data;
        }),
      ),
    );
    return data;
  }
}
