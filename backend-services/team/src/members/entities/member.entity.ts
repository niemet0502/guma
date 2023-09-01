import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Member {
  @Field(() => Int)
  id: number;

  @Field({ nullable: false })
  team_id: number;

  @Field({ nullable: false })
  user_id: number;

  @Field()
  created_at: Date;
}
