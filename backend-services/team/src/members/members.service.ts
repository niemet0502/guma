import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { Member } from './entities/member.entity';

@Injectable()
export class MembersService {
  private url = 'http://neka-data-access-1:3000/members/';

  constructor(private readonly http: HttpService) {}

  async create(createMemberInput: CreateMemberInput): Promise<Member> {
    const { data } = await firstValueFrom(
      this.http.post<Member>(this.url, createMemberInput),
    );
    return data;
  }

  async findAllByTeam(team_id: number): Promise<Member[]> {
    const { data } = await firstValueFrom(
      this.http.get<Member[]>(this.url, { params: { team_id } }),
    );
    return data;
  }

  async findOne(id: number): Promise<Member> {
    const { data } = await firstValueFrom(
      this.http.get<Member>(`${this.url}${id}`),
    );
    return data;
  }

  async update(
    id: number,
    updateMemberInput: UpdateMemberInput,
  ): Promise<Member> {
    const { data } = await firstValueFrom(
      this.http.patch<Member>(`${this.url}${id}`, updateMemberInput),
    );
    return data;
  }

  async remove(id: number): Promise<Member> {
    const { data } = await firstValueFrom(
      this.http.delete<Member>(`${this.url}${id}`),
    );
    return { ...data, id };
  }
}
