import { CreateSprintInput } from './create-sprint.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSprintInput extends PartialType(CreateSprintInput) {
  @Field(() => Int)
  id: number;
}
