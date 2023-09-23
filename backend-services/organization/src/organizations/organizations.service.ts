import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { firstValueFrom } from 'rxjs';
import { LabelsService } from 'src/labels/labels.service';
import { DEFAULT_ORGANIZATION_LABEL } from 'src/utils/Constant';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationsService {
  private url = 'http://localhost:5002/organizations/';
  private readonly graphQLClient: GraphQLClient;

  constructor(
    private readonly http: HttpService,
    private readonly labelService: LabelsService,
  ) {
    this.graphQLClient = new GraphQLClient('http://localhost:5005/graphql');
  }

  async create(
    createOrganizationInput: CreateOrganizationInput,
  ): Promise<Organization> {
    // create the organization
    const { data } = await firstValueFrom(
      this.http.post<Organization>(this.url, createOrganizationInput),
    );

    const { name, id: organization_id } = data;

    // create a team with the organization's name
    await this.createTeam(name, organization_id);

    // create organization's labels
    DEFAULT_ORGANIZATION_LABEL.map(async (name) => {
      await this.labelService.create({ name, organization_id });
    });

    // update the user by setting the organization_id

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

  async createTeam(name: string, organization_id: number) {
    const mutation = `
    mutation CreateTeam($createTeamInput: CreateTeamInput!) {
      createTeam(
        createTeamInput: $createTeamInput
      ) {
        id 
        name 
        identifier
      }
    }
  `;

    const variables = {
      createTeamInput: {
        name,
        organization_id,
        identifier: name.slice(0, 3).toUpperCase(),
      },
    };

    try {
      const data: any = await this.graphQLClient.request(mutation, variables);
      return data.createTeam;
    } catch (error) {
      console.error('GraphQL mutation error:', error);
      throw error;
    }
  }
}
