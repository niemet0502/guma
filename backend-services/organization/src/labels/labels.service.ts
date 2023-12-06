import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateLabelInput } from './dto/create-label.input';
import { UpdateLabelInput } from './dto/update-label.input';
import { Label } from './entities/label.entity';

@Injectable()
export class LabelsService {
  private url = 'http://localhost:5002/labels/';

  constructor(private readonly http: HttpService) {}

  async create(createLabelInput: CreateLabelInput): Promise<Label> {
    const { data } = await firstValueFrom(
      this.http.post<Label>(this.url, createLabelInput),
    );
    return data;
  }

  async findAll(organization_id: number): Promise<Label[]> {
    const { data } = await firstValueFrom(
      this.http.get<Label[]>(this.url, { params: { organization_id } }),
    );

    return data;
  }

  async findOne(id: number): Promise<Label> {
    const { data } = await firstValueFrom(this.http.get<Label>(this.url + id));
    return data;
  }

  async update(id: number, updateLabelInput: UpdateLabelInput): Promise<Label> {
    const { data } = await firstValueFrom(
      this.http.patch<Label>(`${this.url}${id}`, updateLabelInput),
    );
    return data;
  }

  async remove(id: number): Promise<Label> {
    const { data } = await firstValueFrom(
      this.http.delete<Label>(`${this.url}${id}`),
    );
    return { ...data, id };
  }
}
