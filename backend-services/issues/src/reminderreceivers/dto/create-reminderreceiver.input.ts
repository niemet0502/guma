import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateReminderreceiverInput {
  @Field(() => Int)
  user_id: number;

  @Field(() => Int)
  reminder_id: number;
}
