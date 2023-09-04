import { Field, InputType } from '@nestjs/graphql';
import { TaskType } from 'src/shared/tasks.enum';

@InputType()
export class CreateTaskInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  type: TaskType;

  @Field({ nullable: true })
  priority: number;

  // TODO remove the created by

  @Field({ nullable: false })
  created_by: number;

  @Field({ nullable: true })
  parent_task_id: number;

  @Field({ nullable: true })
  sprint_id: number;

  @Field({ nullable: false })
  status_id: number;

  @Field({ nullable: false })
  team_id: number;
}
