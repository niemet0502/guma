import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { LivrablesService } from '../livrables/livrables.service';
import { CreateLivrableupdateInput } from './dto/create-livrableupdate.input';
import { UpdateLivrableupdateInput } from './dto/update-livrableupdate.input';
import { Livrableupdate } from './entities/livrableupdate.entity';

@Injectable()
export class LivrableupdatesService {
  private url = 'http://data-access:3000/livrableupdates/';

  constructor(
    private readonly http: HttpService,
    @Inject(forwardRef(() => LivrablesService))
    private readonly livrableService: LivrablesService,
  ) {}

  async create(
    createLivrableupdateInput: CreateLivrableupdateInput,
  ): Promise<Livrableupdate> {
    const { data } = await firstValueFrom(
      this.http.post<Livrableupdate>(this.url, createLivrableupdateInput).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async findAll(livrable_id: number): Promise<Livrableupdate[]> {
    const { data } = await firstValueFrom(
      this.http.get<Livrableupdate[]>(this.url, {
        params: {
          livrable_id,
        },
      }),
    );
    return data;
  }

  async findOne(id: number): Promise<Livrableupdate> {
    const { data } = await firstValueFrom(
      this.http.get<Livrableupdate>(this.url + id).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async update(
    id: number,
    updateLivrableupdateInput: UpdateLivrableupdateInput,
  ): Promise<Livrableupdate> {
    const { data } = await firstValueFrom(
      this.http
        .patch<Livrableupdate>(`${this.url}${id}`, updateLivrableupdateInput)
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async remove(id: number): Promise<Livrableupdate> {
    const { data } = await firstValueFrom(
      this.http.delete<Livrableupdate>(`${this.url}${id}`),
    );
    return { id, ...data };
  }

  async getLivrable(id: number) {
    return await this.livrableService.findOne(id);
  }
}
