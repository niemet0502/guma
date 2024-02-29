import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CustomLogger } from 'src/logger/custom-logger.service';
import { Profile } from '../profiles/entities/profile.entity';
import { ProfilesService } from '../profiles/profiles.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private url = 'http://data-access:3000/users/';

  constructor(
    private readonly http: HttpService,
    private readonly profileService: ProfilesService,
    private logger: CustomLogger,
  ) {
    this.logger.setContext('UsersService');
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { data } = await firstValueFrom(
      this.http.post<User>(this.url, createUserInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data, 'create');
          throw error.response.data;
        }),
      ),
    );
    return data;
  }

  async findAllByTeam(project_id: number): Promise<User[]> {
    const { data } = await firstValueFrom(
      this.http.get<User[]>(this.url, { params: { project_id } }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data, 'findAllByTeam');
          throw error.response.data;
        }),
      ),
    );
    return data;
  }

  async findOne(id: number): Promise<User> {
    this.logger.log('Api call to fetch data', 'findOne');

    const { data } = await firstValueFrom(
      this.http.get<User>(this.url + id).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data, 'findOne');
          throw error.response.data;
        }),
      ),
    );
    return data;
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const { data } = await firstValueFrom(
      this.http.patch<User>(`${this.url}${id}`, updateUserInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data, 'update');
          throw error.response.data;
        }),
      ),
    );
    return data;
  }

  async remove(id: number): Promise<User> {
    const { data } = await firstValueFrom(
      this.http.delete<User>(this.url + id).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data, 'remove');
          throw error.response.data;
        }),
      ),
    );
    return data;
  }

  async getUserProfile(user: User): Promise<Profile> {
    return await this.profileService.findOne(user.profile_id);
  }
}
