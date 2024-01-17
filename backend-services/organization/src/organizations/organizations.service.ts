import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { firstValueFrom } from 'rxjs';
import { LabelsService } from '../labels/labels.service';
import { User } from '../shared/user.entity';
import { DEFAULT_ORGANIZATION_LABEL } from '../utils/Constant';
import { CreateProjectInput } from './dto/create-organization.input';
import { UpdateProjectInput } from './dto/update-organization.input';
import { Project } from './entities/project.entity';

@Injectable()
export class OrganizationsService {
  private url = 'http://data-access:3000/projects/';
  private readonly teamGraphQLClient: GraphQLClient;
  private readonly userGraphQLClient: GraphQLClient;

  constructor(
    private readonly http: HttpService,
    private readonly labelService: LabelsService,
  ) {
    this.teamGraphQLClient = new GraphQLClient('http://team:3000/graphql');
    this.userGraphQLClient = new GraphQLClient('http://user:3000/graphql');
  }

  async create(
    createOrganizationInput: CreateProjectInput,
    user: User,
  ): Promise<Project> {
    // create the organization
    const { data } = await firstValueFrom(
      this.http.post<Project>(this.url, createOrganizationInput),
    );

    console.log(data);

    const { name, id: project_id } = data;

    // create a team with the organization's name
    await this.createTeam(name, project_id, user);

    // create organization's labels
    DEFAULT_ORGANIZATION_LABEL.map(async (name) => {
      await this.labelService.create({ name, project_id });
    });

    // update the user by setting the project_id
    await this.updateUser(user.id, project_id);

    return data;
  }

  async findAll(): Promise<Project[]> {
    const { data } = await firstValueFrom(this.http.get<Project[]>(this.url));
    return data;
  }

  async findOne(id: number): Promise<Project> {
    const { data } = await firstValueFrom(
      this.http.get<Project>(this.url + id),
    );
    return data;
  }

  async update(
    id: number,
    updateOrganizationInput: UpdateProjectInput,
  ): Promise<Project> {
    const { data } = await firstValueFrom(
      this.http.patch<Project>(`${this.url}${id}`, updateOrganizationInput),
    );
    return data;
  }

  async remove(id: number): Promise<Project> {
    const { data } = await firstValueFrom(
      this.http.delete<Project>(this.url + id),
    );
    return data;
  }

  async createTeam(name: string, project_id: number, user: User) {
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
        project_id,
        identifier: name.slice(0, 3).toUpperCase(),
      },
    };

    const headers = {
      user: JSON.stringify(user),
    };

    try {
      const data: any = await this.teamGraphQLClient.request(
        mutation,
        variables,
        headers,
      );
      return data.createTeam;
    } catch (error) {
      console.error('GraphQL mutation error:', error);
      throw error;
    }
  }

  async updateUser(id: number, project_id: number) {
    const mutation = `
      mutation UpdateUser($updateUserInput: UpdateUserInput!){
        updateUser(updateUserInput: $updateUserInput){
          id 
        }
      }
    `;

    const variables = {
      updateUserInput: {
        id,
        project_id,
        profile_id: 1,
      },
    };

    try {
      const data: any = await this.userGraphQLClient.request(
        mutation,
        variables,
      );
      return data.createTeam;
    } catch (error) {
      console.error('GraphQL mutation error:', error);
      throw error;
    }
  }
}
