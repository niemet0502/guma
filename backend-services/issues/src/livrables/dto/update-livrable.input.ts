import { CreateLivrableInput } from './create-livrable.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLivrableInput extends PartialType(CreateLivrableInput) {
  @Field(() => Int)
  id: number;
}
