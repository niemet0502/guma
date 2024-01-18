import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { VotesService } from 'src/votes/votes.service';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswersService {
  private url = 'http://data-access:3000/answers/';

  constructor(
    private readonly http: HttpService,
    private readonly votesService: VotesService,
  ) {}

  async create(createAnswerInput: CreateAnswerInput) {
    const { data } = await firstValueFrom(
      this.http.post<Answer>(this.url, createAnswerInput).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async findAllByQuestion(question_id: number) {
    const { data } = await firstValueFrom(
      this.http.get<Answer[]>(this.url, { params: { question_id } }),
    );
    return data;
  }

  async findOne(id: number) {
    const { data } = await firstValueFrom(
      this.http.get<Answer>(this.url + id).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async update(id: number, updateAnswerInput: UpdateAnswerInput) {
    const { data } = await firstValueFrom(
      this.http.patch<Answer>(`${this.url}${id}`, updateAnswerInput).pipe(
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
      this.http.delete<Answer>(`${this.url}${id}`),
    );
    return { id, ...data };
  }

  async getVotes(answer_id: number) {
    return await this.votesService.findAllByAnswer(answer_id);
  }
}
