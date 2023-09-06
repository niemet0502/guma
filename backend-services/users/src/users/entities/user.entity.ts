import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Profile } from '../../profiles/entities/profile.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  firstname?: string;

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
