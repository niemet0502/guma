import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  private url = 'http://data-access:3000/comments/';

  constructor(private readonly http: HttpService) {}

  async create(createCommentInput: CreateCommentInput): Promise<Comment> {
    const { data } = await firstValueFrom(
      this.http.post<Comment>(this.url, createCommentInput),
    );
    return data;
  }

  async findAll(task_id: number, parent_id: number): Promise<Comment[]> {
    const { data } = await firstValueFrom(
      this.http.get<Comment[]>(this.url, {
        params: { task_id, parent_id },
      }),
    );
    return data;
  }

  async findOne(id: number): Promise<Comment> {
    const { data } = await firstValueFrom(
      this.http.get<Comment>(this.url + id),
    );
    return data;
  }

  async update(
    id: number,
    updateCommentInput: UpdateCommentInput,
  ): Promise<Comment> {
    const { data } = await firstValueFrom(
      this.http.patch<Comment>(`${this.url}${id}`, updateCommentInput),
    );
    return data;
  }

  async remove(id: number): Promise<Comment> {
    const { data } = await firstValueFrom(
      this.http.delete<Comment>(`${this.url}${id}`),
    );
    return { id, ...data };
  }
}
