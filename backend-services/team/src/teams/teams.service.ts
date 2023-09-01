import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  private url = 'http://neka-data-access-1:3000/teams/';

  constructor(private readonly http: HttpService) {}

  async create(createTeamInput: CreateTeamInput): Promise<Team> {
    const { data } = await firstValueFrom(
      this.http.post<Team>(this.url, createTeamInput),
    );
    return data;
  }

  async findAllByOrganization(organization_id: number): Promise<Team[]> {
    const { data } = await firstValueFrom(
      this.http.get<Team[]>(this.url, { params: { organization_id } }),
    );
    return data;
  }

  async findOne(id: number): Promise<Team> {
    const { data } = await firstValueFrom(
      this.http.get<Team>(`${this.url}${id}`),
    );
    return data;
  }

  async update(id: number, updateTeamInput: UpdateTeamInput): Promise<Team> {
    const { data } = await firstValueFrom(
      this.http.patch<Team>(`${this.url}${id}`, updateTeamInput),
    );
    return data;
  }

  async remove(id: number): Promise<Team> {
    console.log(`${this.url}${id}`);
    const { data } = await firstValueFrom(
      this.http.delete<Team>(`${this.url}${id}`),
    );
    return { ...data, id };
  }
}
