import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CustomLogger } from '../logger/custom-logger.service';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  private url = 'http://data-access:3000/profiles/';

  constructor(
    private readonly http: HttpService,
    private logger: CustomLogger,
  ) {
    this.logger.setContext('ProfilesService');
  }

  async create(createProfileInput: CreateProfileInput): Promise<Profile> {
    this.logger.log(
      {
        message: 'Create profile',
        data: createProfileInput,
      },
      'create',
    );

    const { data } = await firstValueFrom(
      this.http.post<Profile>(this.url, createProfileInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data, 'create');
          throw error.response.data;
        }),
      ),
    );
    return data;
  }

  async findAll(): Promise<Profile[]> {
    this.logger.log(`Fetching all profiles`, 'findAll');

    const { data } = await firstValueFrom(
      this.http.get<Profile[]>(this.url).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data, 'findAll');
          throw error.response.data;
        }),
      ),
    );
    return data;
  }

  async findOne(id: number): Promise<Profile> {
    const { data } = await firstValueFrom(
      this.http.get<Profile>(`${this.url}${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data, 'findOne');
          throw error.response.data;
        }),
      ),
    );
    return data;
  }

  async update(
    id: number,
    updateProfileInput: UpdateProfileInput,
  ): Promise<Profile> {
    const { data } = await firstValueFrom(
      this.http.patch<Profile>(`${this.url}${id}`, updateProfileInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data, 'update');
          throw error.response.data;
        }),
      ),
    );
    return data;
  }
}
