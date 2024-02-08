import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateVoteInput } from './dto/create-vote.input';
import { UpdateVoteInput } from './dto/update-vote.input';
import { Vote } from './entities/vote.entity';

@Injectable()
export class VotesService {
  private url = 'http://data-access:3000/answervotes/';
  constructor(private readonly http: HttpService) {}

  async create(createVoteInput: CreateVoteInput) {
    const { data } = await firstValueFrom(
      this.http.post<Vote>(this.url, createVoteInput).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async findAllByAnswer(answer_id: number) {
    const { data } = await firstValueFrom(
      this.http.get<Vote[]>(this.url, { params: { answer_id } }),
    );
    return data;
  }

  async findOne(id: number) {
    const { data } = await firstValueFrom(
      this.http.get<Vote>(this.url + id).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  update(id: number, updateVoteInput: UpdateVoteInput) {
    return `This action updates a #${id} vote`;
  }

  remove(id: number) {
    return `This action removes a #${id} vote`;
  }
}
