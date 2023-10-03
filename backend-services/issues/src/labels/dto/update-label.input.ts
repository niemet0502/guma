import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateTaskLabelInput } from './create-label.input';

@InputType()
export class UpdateTaskLabelInput extends PartialType(CreateTaskLabelInput) {
  @Field(() => Int)
  id: number;
}
