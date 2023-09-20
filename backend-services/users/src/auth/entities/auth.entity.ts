import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { UserSession } from './session.entity';

@ObjectType()
export class Auth {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => UserSession, { nullable: true })
  session?: UserSession;
}
