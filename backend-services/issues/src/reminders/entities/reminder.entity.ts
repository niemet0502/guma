import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Task } from '../../tasks/entities/task.entity';

@ObjectType()
export class Reminder {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: false })
  task_id: number;

  @Field((type) => Task, { nullable: true })
  task?: Task;

  @Field()
  send_at: string;

  @Field()
  created_by: number;

  @Field()
  created_at: string;

  @Field({ nullable: true })
  type: number;
}
