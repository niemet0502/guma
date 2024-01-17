import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLivrableInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
