import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Question {
  @Field(() => ID)
  id: number;

  @Field({ nullable: false })
  title: string;

  @Field({ nullable: true })
  content: string;

  @Field()
  created_at: string;

  @Field(() => Int)
  created_by: number;

  @Field(() => Int)
  view: number;

  @Field()
  updated_at: string;
}
