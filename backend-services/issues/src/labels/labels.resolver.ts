import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Label } from 'src/shared/label.entity';
import { CreateTaskLabelInput } from './dto/create-label.input';
import { TaskLabel } from './entities/label.entity';
import { LabelsService } from './labels.service';

@Resolver(() => TaskLabel)
export class LabelsResolver {
  constructor(private readonly labelsService: LabelsService) {}

  @Mutation(() => TaskLabel, { name: 'createTasklabel' })
  createLabel(
    @Args('createLabelInput') createLabelInput: CreateTaskLabelInput,
  ) {
    return this.labelsService.create(createLabelInput);
  }

  @Query(() => [TaskLabel], { name: 'tasklabels' })
  findAll(@Args('task_id', { type: () => Int }) task_id: number) {
    return this.labelsService.findAllByTask(task_id);
  }

  // @Query(() => TaskLabel, { name: 'label' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.labelsService.findOne(id);
  // }

  // @Mutation(() => TaskLabel)
  // removeLabel(@Args('id', { type: () => Int }) id: number) {
  //   return this.labelsService.remove(id);
  // }

  // @ResolveField()
  // task(@Parent() task: TaskLabel) {
  //   const { task_id } = task;
  //   return this.labelsService.getTask(task_id);
  // }

  @ResolveField(() => Label)
  label(@Parent() task: TaskLabel): any {
    return { __typename: 'Label', id: task.label_id };
  }
}
