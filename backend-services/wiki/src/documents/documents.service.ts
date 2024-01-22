import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateDocumentInput } from './dto/create-document.input';
import { UpdateDocumentInput } from './dto/update-document.input';

@Injectable()
export class DocumentsService {
  private url = 'http://data-access:3000/documents/';

  constructor(private readonly http: HttpService) {}

  async create(createDocumentInput: CreateDocumentInput): Promise<Document> {
    const { data } = await firstValueFrom(
      this.http.post<Document>(this.url, createDocumentInput),
    );
    return data;
  }

  async findAllByTeam(
    team_id: number,
    folder_id: number,
    livrable_id: number,
    task_id: number,
  ): Promise<Document[]> {
    const { data } = await firstValueFrom(
      this.http.get<Document[]>(this.url, {
        params: { team_id, folder_id, livrable_id, task_id },
      }),
    );

    return data;
  }

  async findAllByFolder(folder_id: number): Promise<Document[]> {
    const { data } = await firstValueFrom(
      this.http.get<Document[]>(this.url, { params: { folder_id } }),
    );

    return data;
  }

  async findOne(id: number): Promise<Document> {
    const { data } = await firstValueFrom(
      this.http.get<Document>(this.url + id),
    );
    return data;
  }

  async update(
    id: number,
    updateDocumentInput: UpdateDocumentInput,
  ): Promise<Document> {
    const { data } = await firstValueFrom(
      this.http.patch<Document>(`${this.url}${id}`, updateDocumentInput),
    );
    return data;
  }

  async remove(id: number) {
    const { data } = await firstValueFrom(
      this.http.delete<Document>(`${this.url}${id}`),
    );
    return { ...data, id };
  }
}
