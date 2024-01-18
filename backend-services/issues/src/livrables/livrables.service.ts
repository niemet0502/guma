import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { LivrableupdatesService } from '../livrableupdates/livrableupdates.service';
import { CreateLivrableInput } from './dto/create-livrable.input';
import { UpdateLivrableInput } from './dto/update-livrable.input';
import { Livrable } from './entities/livrable.entity';

@Injectable()
export class LivrablesService {
  private url = 'http://data-access:3000/livrables/';

  constructor(
    private readonly http: HttpService,
    @Inject(forwardRef(() => LivrableupdatesService))
    private readonly updatesService: LivrableupdatesService,
  ) {}

  async create(createLivrableInput: CreateLivrableInput): Promise<Livrable> {
    const { data } = await firstValueFrom(
      this.http.post<Livrable>(this.url, createLivrableInput).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async findAll(team_id: number): Promise<Livrable[]> {
    const { data } = await firstValueFrom(
      this.http.get<Livrable[]>(this.url, {
        params: {
          team_id,
        },
      }),
    );
    return data;
  }

  async findOne(id: number): Promise<Livrable> {
    const { data } = await firstValueFrom(
      this.http.get<Livrable>(this.url + id).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async update(id: number, updateLivrableInput: UpdateLivrableInput) {
    const { data } = await firstValueFrom(
      this.http.patch<Livrable>(`${this.url}${id}`, updateLivrableInput).pipe(
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
      this.http.delete<Livrable>(`${this.url}${id}`),
    );
    return { id, ...data };
  }

  async getUpdates(id: number) {
    return this.updatesService.findAll(id);
  }
}
