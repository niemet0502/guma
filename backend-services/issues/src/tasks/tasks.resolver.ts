import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
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
  ) {
    return this.tasksService.findAll(team_id, type, status_id, parent_task_id);
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
}