import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../shared/user.entity';

@ObjectType()
export class Vote {
  @Field(() => ID)
  id: number;

  @Field()
  created_by: number;

  @Field()
  answer_id: number;

  @Field((type) => Boolean)
  isvalidated: boolean;

  @Field(() => User)
  author?: User;
}
