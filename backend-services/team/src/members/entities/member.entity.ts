import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../shared/user.entity';
import { Team } from '../../teams/entities/team.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Member {
  @Field(() => ID)
  id: number;

  @Field({ nullable: false })
  team_id: number;

  @Field((type) => Team)
  team?: Team;

  @Field({ nullable: false })
  user_id: number;

  @Field((type) => User)
  user?: User;

  @Field()
  created_at: Date;
}
