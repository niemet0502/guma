import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateQuestionInput {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  content: string;

  @Field({ nullable: false })
  created_by: number;
}
