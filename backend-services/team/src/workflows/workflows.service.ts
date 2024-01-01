import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Status } from '../status/entities/status.entity';
import { StatusService } from '../status/status.service';
import { CreateWorkflowInput } from './dto/create-workflow.input';
import { UpdateWorkflowInput } from './dto/update-workflow.input';
import { Workflow } from './entities/workflow.entity';

@Injectable()
export class WorkflowsService {
  private url = 'http://localhost:5002/workflow/';

  constructor(
    private readonly http: HttpService,
    private readonly statusService: StatusService,
  ) {}

  async create(createWorkflowInput: CreateWorkflowInput) {
    const { data } = await firstValueFrom(
      this.http.post<Workflow>(this.url, createWorkflowInput).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async findAllByTeam(team_id: number) {
    const { data } = await firstValueFrom(
      this.http.get<Workflow[]>(this.url, { params: { team_id } }),
    );
    return data;
  }

  async findOne(id: number) {
    const { data } = await firstValueFrom(
      this.http.get<Workflow>(`${this.url}${id}`),
    );
    return data;
  }

  async update(
    id: number,
    updateWorkflowInput: UpdateWorkflowInput,
  ): Promise<Workflow> {
    const { data } = await firstValueFrom(
      this.http.patch<Workflow>(`${this.url}${id}`, updateWorkflowInput),
    );
    return data;
  }

  async remove(id: number) {
    const { data } = await firstValueFrom(
      this.http.delete<Workflow>(`${this.url}${id}`),
    );
    return { ...data, id };
  }

  async getStatus(status_id: number): Promise<Status> {
    return await this.statusService.findOne(status_id);
  }
}
