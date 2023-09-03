import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field({ nullable: true })
  content: string;

  @Field()
  task_id: number;

  @Field()
  created_by: number;
}
