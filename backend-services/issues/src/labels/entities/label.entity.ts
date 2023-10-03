import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Label } from '../../shared/label.entity';
import { Task } from '../../tasks/entities/task.entity';

@ObjectType()
export class TaskLabel {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  task_id: number;

  @Field(() => Task)
  task: Task;

  @Field(() => Int)
  label_id: number;

  @Field(() => Label)
  label: Label;
}
