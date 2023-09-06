import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../shared/user.entity';

@ObjectType()
export class Member {
  @Field(() => Int)
  id: number;

  @Field({ nullable: false })
  team_id: number;

  @Field({ nullable: false })
  user_id: number;

  @Field((type) => User)
  user?: User;

  @Field()
  created_at: Date;
}
