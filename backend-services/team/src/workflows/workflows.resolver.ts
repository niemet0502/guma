import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Status } from '../status/entities/status.entity';
import { CreateWorkflowInput } from './dto/create-workflow.input';
import { UpdateWorkflowInput } from './dto/update-workflow.input';
import { Workflow } from './entities/workflow.entity';
import { WorkflowsService } from './workflows.service';

@Resolver(() => Workflow)
export class WorkflowsResolver {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @Mutation(() => Workflow)
  createWorkflow(
    @Args('createWorkflowInput') createWorkflowInput: CreateWorkflowInput,
  ) {
    return this.workflowsService.create(createWorkflowInput);
  }

  @Query(() => [Workflow], { name: 'workflows' })
  async findAll(@Args('team_id', { type: () => Int }) team_id: number) {
    return await this.workflowsService.findAllByTeam(team_id);
  }

  @Query(() => Workflow, { name: 'workflow' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.workflowsService.findOne(id);
  }

  @Mutation(() => Workflow)
  updateWorkflow(
    @Args('updateWorkflowInput') updateWorkflowInput: UpdateWorkflowInput,
  ) {
    return this.workflowsService.update(
      updateWorkflowInput.id,
      updateWorkflowInput,
    );
  }

  @Mutation(() => Workflow)
  removeWorkflow(@Args('id', { type: () => Int }) id: number) {
    return this.workflowsService.remove(id);
  }

  @ResolveField('status', (returns) => Status)
  async status(@Parent() workflow: Workflow): Promise<Status> {
    const { status_id } = workflow;
    return await this.workflowsService.getStatus(status_id);
  }
}
