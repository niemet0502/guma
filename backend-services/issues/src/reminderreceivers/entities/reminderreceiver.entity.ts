import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Reminder } from '../../reminders/entities/reminder.entity';
import { User } from '../../shared/user.entity';

@ObjectType()
export class ReminderReceiver {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  user_id: number;

  @Field(() => User)
  user: User;

  @Field(() => Int)
  reminder_id: number;

  @Field(() => Reminder)
  reminder: Reminder;
}
