import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Team } from 'src/shared/team.entity';
import { User } from 'src/shared/user.entity';
import { Status } from '../shared/status.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    // TODO get the user.id from the header
    return this.tasksService.create(createTaskInput);
  }

  @Query(() => [Task], { name: 'tasks' })
  findAll(
    @Args('team_id', { type: () => Int }) team_id: number,
    @Args('type', { type: () => Int, nullable: true }) type: number,
    @Args('status_id', { type: () => Int, nullable: true }) status_id: number,
    @Args('parent_task_id', { type: () => Int, nullable: true })
    parent_task_id: number,
    @Args('sprint_id', { type: () => Int, nullable: true }) sprint_id: number,
  ) {
    return this.tasksService.findAll(
      team_id,
      type,
      status_id,
      parent_task_id,
      sprint_id,
    );
  }

  @Query(() => Task, { name: 'task' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.findOne(id);
  }

  @Mutation(() => Task)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.tasksService.update(updateTaskInput.id, updateTaskInput);
  }

  @Mutation(() => Task)
  removeTask(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.remove(id);
  }

  @ResolveField()
  subtasks(@Parent() task: Task) {
    const { id, team_id } = task;

    return this.tasksService.getSubtasks(id, team_id);
  }

  @ResolveField()
  comments(@Parent() task: Task) {
    const { id } = task;
    return this.tasksService.getComments(id);
  }

  @ResolveField()
  activities(@Parent() task: Task) {
    const { id } = task;
    return this.tasksService.getActivities(id);
  }

  @ResolveField(() => User)
  author(@Parent() task: Task): any {
    return { __typename: 'User', id: task.created_by };
  }

  @ResolveField(() => User)
  assignee(@Parent() task: Task): any {
    const { assignee_to } = task;
    if (!assignee_to) return;
    return { __typename: 'User', id: assignee_to };
  }

  @ResolveField(() => Team)
  team(@Parent() task: Task): any {
    return { __typename: 'Team', id: task.team_id };
  }

  @ResolveField((of) => Status)
  status(@Parent() task: Task): any {
    return { __typename: 'Status', id: task.status_id };
  }
}
