import { CreateLabelInput } from './create-label.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLabelInput extends PartialType(CreateLabelInput) {
  @Field(() => Int)
  id: number;
}
