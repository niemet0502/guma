import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AnswersService } from '../answers/answers.service';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  private url = 'http://data-access:3000/questions/';

  constructor(
    private readonly http: HttpService,
    private readonly answerQuestion: AnswersService,
  ) {}

  async create(createQuestionInput: CreateQuestionInput) {
    const { data } = await firstValueFrom(
      this.http.post<Question>(this.url, createQuestionInput).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async findAll() {
    const { data } = await firstValueFrom(this.http.get<Question[]>(this.url));
    return data;
  }

  async findOne(id: number) {
    const { data } = await firstValueFrom(
      this.http.get<Question>(this.url + id).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async update(id: number, updateQuestionInput: UpdateQuestionInput) {
    const { data } = await firstValueFrom(
      this.http.patch<Question>(`${this.url}${id}`, updateQuestionInput).pipe(
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
      this.http.delete<Question>(`${this.url}${id}`),
    );
    return { id, ...data };
  }

  async getAnswers(question_id: number) {
    return await this.answerQuestion.findAllByQuestion(question_id);
  }
}
