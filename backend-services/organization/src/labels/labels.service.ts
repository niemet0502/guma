import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CustomLogger } from '../logger/custom-logger.service';
import { CreateLabelInput } from './dto/create-label.input';
import { UpdateLabelInput } from './dto/update-label.input';
import { Label } from './entities/label.entity';

@Injectable()
export class LabelsService {
  private url = 'http://data-access:3000/labels/';

  constructor(
    private readonly http: HttpService,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setContext('LabelsService');
  }

  async create(createLabelInput: CreateLabelInput): Promise<Label> {
    const { data } = await firstValueFrom(
      this.http.post<Label>(this.url, createLabelInput).pipe(
        catchError((error: AxiosError) => {
          // this.logger.error(error.response.data);
          console.log(error);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async findAll(project_id?: number, team_id?: number): Promise<Label[]> {
    const { data } = await firstValueFrom(
      this.http
        .get<Label[]>(this.url, { params: { project_id, team_id } })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw error.response.data;
          }),
        ),
    );

    return data;
  }

  async findOne(id: number): Promise<Label> {
    const { data } = await firstValueFrom(this.http.get<Label>(this.url + id));
    return data;
  }

  async update(id: number, updateLabelInput: UpdateLabelInput): Promise<Label> {
    const { data } = await firstValueFrom(
      this.http.patch<Label>(`${this.url}${id}`, updateLabelInput),
    );
    return data;
  }

  async remove(id: number): Promise<Label> {
    const { data } = await firstValueFrom(
      this.http.delete<Label>(`${this.url}${id}`),
    );
    return { ...data, id };
  }
}
