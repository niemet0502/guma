import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CustomLogger } from '../logger/custom-logger.service';
import { CreateMemberProjectInput } from './dto/create-member.input';
import { ProjectMember } from './entities/member.entity';

@Injectable()
export class MembersService {
  private url = 'http://data-access:3000/projects/members';

  constructor(
    private readonly http: HttpService,
    private logger: CustomLogger,
  ) {
    this.logger.setContext('ProjectMemberService');
  }

  async create(createMemberInput: CreateMemberProjectInput) {
    this.logger.log(
      {
        message: 'Starting to assign a user to a project...',
        data: createMemberInput,
      },
      'create',
    );

    const { data } = await firstValueFrom(
      this.http.post<ProjectMember>(this.url, createMemberInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          const e: any = error.response.data;
          throw e.message;
        }),
      ),
    );
    return data;
  }

  async findAll(projecId?: number, userId?: number) {
    const params = {
      projecId: projecId ? projecId : undefined,
      userId: userId ? userId : undefined,
    };
    this.logger.log(
      {
        message: "Fetching project's members",
        data: params,
      },
      'findAll',
    );

    const { data } = await firstValueFrom(
      this.http
        .get<ProjectMember[]>(
          this.url + `?projectId=${projecId}&userId=${userId}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    console.log(data);

    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
