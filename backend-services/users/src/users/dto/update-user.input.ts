import { Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends OmitType(CreateUserInput, ['password']) {
  @Field(() => Int)
  id: number;
}
