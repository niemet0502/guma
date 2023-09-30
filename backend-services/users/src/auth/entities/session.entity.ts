import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserSession {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  user_id: number;

  @Field(() => String)
  token: string;

  @Field(() => String)
  created_at: string;

  @Field(() => String)
  expired_at: string;
}
