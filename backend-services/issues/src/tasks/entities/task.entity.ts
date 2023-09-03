import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TaskType } from 'src/shared/tasks.enum';

@ObjectType()
export class Task {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field({ nullable: false })
  slug: string;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  number: string;

  @Field()
  type: TaskType;

  @Field({ nullable: true })
  priority: number;

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

  @Field((type) => [Task])
  subtasks: Task[];
}
