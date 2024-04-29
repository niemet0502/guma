import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Project } from '../../organizations/entities/project.entity';
import { Profile } from '../../shared/profile.entity';
import { User } from '../../shared/user.entity';

@ObjectType()
export class ProjectMember {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => Int, { nullable: true })
  project_id: number;

  @Field(() => Int, { nullable: true })
  user_id: number;

  @Field(() => Int, { nullable: true })
  profile_id: number;

  @Field(() => Project, { nullable: true })
  project: number;

  @Field(() => User, { nullable: true })
  user: number;

  @Field(() => Profile, { nullable: true })
  profile: Profile;
}
