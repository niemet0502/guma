import { CreateWorkflowInput } from './create-workflow.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWorkflowInput extends PartialType(CreateWorkflowInput) {
  @Field(() => Int)
  id: number;
}
