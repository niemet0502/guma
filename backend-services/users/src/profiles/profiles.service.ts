import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  private url = 'http://localhost:5002/profiles/';

  constructor(private readonly http: HttpService) {}

  async create(createProfileInput: CreateProfileInput): Promise<Profile> {
    const { data } = await firstValueFrom(
      this.http.post<Profile>(this.url, createProfileInput),
    );
    return data;
  }

  async findAll(): Promise<Profile[]> {
    const { data } = await firstValueFrom(this.http.get<Profile[]>(this.url));
    return data;
  }

  async findOne(id: number): Promise<Profile> {
    const { data } = await firstValueFrom(
      this.http.get<Profile>(`${this.url}${id}`),
    );
    return data;
  }

  async update(
    id: number,
    updateProfileInput: UpdateProfileInput,
  ): Promise<Profile> {
    const { data } = await firstValueFrom(
      this.http.patch<Profile>(`${this.url}${id}`, updateProfileInput),
    );
    return data;
  }
}
