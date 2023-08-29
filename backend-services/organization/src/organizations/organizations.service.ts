import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationsService {
  private url = 'http://neka-data-access-1:3000/organizations/';

  constructor(private readonly http: HttpService) {}

  async create(
    createOrganizationInput: CreateOrganizationInput,
  ): Promise<Organization> {
    const { data } = await firstValueFrom(
      this.http.post<Organization>(this.url, createOrganizationInput),
    );
    return data;
  }

  async findAll(): Promise<Organization[]> {
    const { data } = await firstValueFrom(
      this.http.get<Organization[]>(this.url),
    );
    return data;
  }

  async findOne(id: number): Promise<Organization> {
    const { data } = await firstValueFrom(
      this.http.get<Organization>(this.url + id),
    );
    return data;
  }

  async update(
    id: number,
    updateOrganizationInput: UpdateOrganizationInput,
  ): Promise<Organization> {
    const { data } = await firstValueFrom(
      this.http.patch<Organization>(
        `${this.url}${id}`,
        updateOrganizationInput,
      ),
    );
    return data;
  }

  async remove(id: number): Promise<Organization> {
    const { data } = await firstValueFrom(
      this.http.delete<Organization>(this.url + id),
    );
    return data;
  }
}
