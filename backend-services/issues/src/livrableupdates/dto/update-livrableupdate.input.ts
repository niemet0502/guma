import { CreateLivrableupdateInput } from './create-livrableupdate.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLivrableupdateInput extends PartialType(CreateLivrableupdateInput) {
  @Field(() => Int)
  id: number;
}
