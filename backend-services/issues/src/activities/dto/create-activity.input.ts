import { Field, InputType } from '@nestjs/graphql';
import { ActivityAction } from '../../shared/tasks.enum';

@InputType()
export class CreateActivityInput {
  @Field({ nullable: false })
  created_by: number;

  @Field({ nullable: false })
  task_id: number;

  @Field({
    nullable: true,
  })
  from_status: number;

  @Field({
    nullable: true,
  })
  to_status: number;

  @Field({
    nullable: true,
  })
  sprint_id: number;

  @Field({ nullable: false })
  action: ActivityAction;
}
