import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Profile } from '../../profiles/entities/profile.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  lastname: string;

  @Field()
  firstname: string;

  @Field()
  email: string;

  @Field()
  password: string;
  @Field()
  is_suspended: boolean;

  @Field()
  first_signin: boolean;

  @Field()
  organization_id: number;

  @Field()
  profile_id: number;

  @Field((type) => Profile)
  profile: Profile;
}
