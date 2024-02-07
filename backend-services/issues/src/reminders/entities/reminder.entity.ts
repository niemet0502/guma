import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { ReminderReceiver } from '../../reminderreceivers/entities/reminderreceiver.entity';
import { User } from '../../shared/user.entity';
import { Task } from '../../tasks/entities/task.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Reminder {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: false })
  task_id: number;

  @Field(() => Int, { nullable: true })
  status_id?: number;

  @Field((type) => Task, { nullable: true })
  task?: Task;

  @Field()
  send_at: string;

  @Field()
  created_by: number;

  @Field((type) => User, { nullable: true })
  author?: User;

  @Field()
  created_at: string;

  @Field({ nullable: true })
  type: number;

  @Field(() => [ReminderReceiver], { nullable: true })
  receivers?: ReminderReceiver[];
}
