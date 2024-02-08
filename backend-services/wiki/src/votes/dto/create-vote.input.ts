import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateVoteInput {
  @Field(() => Boolean)
  isvalidated: boolean;

  @Field(() => Int)
  answer_id: number;

  @Field(() => Int, { nullable: true })
  created_by: number;
}
