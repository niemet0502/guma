import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateProjectInput } from './create-organization.input';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @Field(() => Int)
  id: number;
}
