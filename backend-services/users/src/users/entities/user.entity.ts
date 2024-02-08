import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Profile } from '../../profiles/entities/profile.entity';
import { Member } from '../../shared/member.entity';
import { Project } from '../../shared/project.entity';

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
  project_id?: number;

  @Field({ nullable: true })
  project?: Project;

  @Field({ nullable: true })
  profile_id?: number;

  @Field((type) => Profile)
  profile: Profile;

  @Field((type) => [Member])
  members?: Member[];
}
