import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTaskLabelInput {
  @Field(() => Int)
  task_id: number;

  @Field(() => Int)
  label_id: number;
}
