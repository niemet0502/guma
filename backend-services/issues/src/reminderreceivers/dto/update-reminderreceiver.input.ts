import { CreateReminderreceiverInput } from './create-reminderreceiver.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReminderreceiverInput extends PartialType(CreateReminderreceiverInput) {
  @Field(() => Int)
  id: number;
}
