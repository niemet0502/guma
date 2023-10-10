import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  sprint_id?: number;

  @Field({ nullable: true })
  assignee_to?: number;

  @Field({ nullable: true })
  parent_task_id?: number;

  @Field({ nullable: true })
  priority?: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}
