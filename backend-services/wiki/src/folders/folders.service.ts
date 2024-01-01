import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { DocumentsService } from '../documents/documents.service';
import { CreateFolderInput } from './dto/create-folder.input';
import { UpdateFolderInput } from './dto/update-folder.input';
import { Folder } from './entities/folder.entity';

@Injectable()
export class FoldersService {
  private url = 'http://localhost:5002/folders/';

  constructor(
    private readonly http: HttpService,
    private readonly documentService: DocumentsService,
  ) {}

  async create(createFolderInput: CreateFolderInput): Promise<Folder> {
    const { data } = await firstValueFrom(
      this.http.post<Folder>(this.url, createFolderInput),
    );
    return data;
  }

  async findAll(team_id: number): Promise<Folder[]> {
    const { data } = await firstValueFrom(
      this.http.get<Folder[]>(this.url, { params: { team_id } }),
    );

    return data;
  }

  async findOne(id: number): Promise<Folder> {
    const { data } = await firstValueFrom(this.http.get<Folder>(this.url + id));
    return data;
  }

  async update(
    id: number,
    updateFolderInput: UpdateFolderInput,
  ): Promise<Folder> {
    const { data } = await firstValueFrom(
      this.http.patch<Folder>(`${this.url}${id}`, updateFolderInput),
    );
    return data;
  }

  async remove(id: number): Promise<Folder> {
    const { data } = await firstValueFrom(
      this.http.delete<Folder>(`${this.url}${id}`),
    );
    return { ...data, id };
  }

  async getDocuments(folder: Folder): Promise<Document[]> {
    return await this.documentService.findAllByFolder(folder.id);
  }
}
