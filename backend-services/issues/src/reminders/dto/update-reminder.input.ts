import { CreateReminderInput } from './create-reminder.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReminderInput extends PartialType(CreateReminderInput) {
  @Field(() => Int)
  id: number;
}
