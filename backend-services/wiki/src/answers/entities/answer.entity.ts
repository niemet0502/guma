import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Answer {
  @Field(() => ID)
  id: number;

  @Field()
  content: string;

  @Field()
  question_id: number;

  @Field()
  created_at: string;

  @Field()
  created_by: number;

  @Field()
  updated_at: string;
}
