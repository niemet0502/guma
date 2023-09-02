import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { Workflow } from './entities/workflow.entity';
import { StatusService } from './status.service';
import { TeamsService } from './teams.service';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(Workflow)
    private workflowRepository: Repository<Workflow>,
    private readonly teamService: TeamsService,
    private readonly statusService: StatusService,
  ) {}

  async create(createWorkflowDto: CreateWorkflowDto): Promise<Workflow> {
    const { team_id, status_id } = createWorkflowDto;

    const team = await this.teamService.findOne(team_id);

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    const status = await this.statusService.findOne(team_id);

    if (!status) {
      throw new NotFoundException('Status not found');
    }

    const workflow = await this.workflowRepository.findOne({
      where: { team_id, status_id },
    });

    if (workflow) {
      throw new BadRequestException({ message: 'The workflow already exists' });
    }

    return await this.workflowRepository.save(createWorkflowDto);
  }

  async findAllByTeam(team_id: number): Promise<Workflow[]> {
    return await this.workflowRepository.find({ where: { team_id } });
  }

  async update(
    id: number,
    updateWorkflowDto: UpdateWorkflowDto,
  ): Promise<Workflow> {
    const toUpdate = await this.workflowRepository.findOne({
      where: { id },
    });

    const updated = Object.assign(toUpdate, updateWorkflowDto);

    return await this.workflowRepository.save(updated);
  }

  async remove(id: number): Promise<Workflow> {
    const workflow = await this.workflowRepository.findOne({ where: { id } });

    if (!workflow) {
      throw new NotFoundException('TaskStatus not found');
    }

    return await this.workflowRepository.remove(workflow);
  }

  async removeMulti(status_id: number) {
    return await this.workflowRepository.delete({ status_id });
  }
}
