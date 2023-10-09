import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateStatusInput } from './dto/create-status.input';
import { UpdateStatusInput } from './dto/update-status.input';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {
  private url = 'http://localhost:5002/status/';

  constructor(private readonly http: HttpService) {}

  async create(createStatusInput: CreateStatusInput): Promise<Status> {
    const { data } = await firstValueFrom(
      this.http.post<Status>(this.url, createStatusInput).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async findAllByTeam(team_id: number): Promise<Status[]> {
    const { data } = await firstValueFrom(
      this.http.get<Status[]>(this.url, { params: { team_id } }),
    );
    return data;
  }

  async findOne(id: number): Promise<Status> {
    const { data } = await firstValueFrom(this.http.get<Status>(this.url + id));
    return data;
  }

  async update(
    id: number,
    updateStatusInput: UpdateStatusInput,
  ): Promise<Status> {
    const { data } = await firstValueFrom(
      this.http.patch<Status>(`${this.url}${id}`, updateStatusInput),
    );
    return data;
  }

  async remove(id: number): Promise<Status> {
    const { data } = await firstValueFrom(
      this.http.delete<Status>(`${this.url}${id}`),
    );
    return { ...data, id };
  }
}
