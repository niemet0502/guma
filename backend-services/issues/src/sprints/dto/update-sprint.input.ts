import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateSprintInput } from './create-sprint.input';

@InputType()
export class UpdateSprintInput extends PartialType(CreateSprintInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Boolean, { nullable: true })
  isCompleted: number;
}
