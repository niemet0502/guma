import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field({ nullable: true })
  content: string;

  @Field({ nullable: true })
  task_id?: number;

  @Field({ nullable: true })
  parent_id?: number;

  @Field({ nullable: true })
  created_by?: number;
}
