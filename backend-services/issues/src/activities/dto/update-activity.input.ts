import { CreateActivityInput } from './create-activity.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateActivityInput extends PartialType(CreateActivityInput) {
  @Field(() => Int)
  id: number;
}
