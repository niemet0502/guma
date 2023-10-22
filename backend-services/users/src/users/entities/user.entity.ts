import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Member } from 'src/shared/member.entity';
import { Organization } from 'src/shared/organization.entity';
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

  @Field({ nullable: true })
  username?: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  is_suspended: boolean;

  @Field()
  first_signin: boolean;

  @Field({ nullable: true })
  organization_id?: number;

  @Field({ nullable: true })
  organization?: Organization;

  @Field({ nullable: true })
  profile_id?: number;

  @Field((type) => Profile)
  profile: Profile;

  @Field((type) => [Member])
  members?: Member[];
}
