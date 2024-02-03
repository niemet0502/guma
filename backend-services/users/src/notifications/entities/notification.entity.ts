import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Reminder } from '../../shared/reminder.entity';

@ObjectType()
export class Notification {
  @Field(() => ID)
  id: number;

  @Field((type) => Int)
  reminder_id: number;

  @Field((type) => Reminder, { nullable: true })
  reminder?: Reminder;

  @Field((type) => Int)
  receiver_id: number;

  @Field((type) => String)
  created_at: string;

  @Field((type) => Boolean)
  read: boolean;

  @Field({ nullable: true })
  content: string;
}
