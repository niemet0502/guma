import { Field, InputType, Int } from '@nestjs/graphql';
import { TaskType } from 'src/shared/tasks.enum';

@InputType()
export class CreateTaskInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  type: TaskType;

  @Field({ nullable: true })
  priority: number;

  @Field(() => [Int], { nullable: true })
  labels: number[];

  @Field({ nullable: true })
  created_by?: number;

  @Field({ nullable: true })
  assignee_to: number;

  @Field({ nullable: true })
  parent_task_id: number;

  @Field({ nullable: true })
  sprint_id: number;

  @Field({ nullable: true })
  status_name?: string;

  @Field({ nullable: false })
  team_id: number;
}
