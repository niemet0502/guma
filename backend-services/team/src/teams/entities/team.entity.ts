import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Member } from '../../members/entities/member.entity';
import { TeamVisibility } from '../teams.enum';

@ObjectType()
export class Team {
  @Field(() => Int)
  id: number;

  @Field({ nullable: false })
  organization_id: number;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  icon: string;

  @Field({ nullable: true })
  identifier: string;

  @Field({ nullable: true })
  visibility: TeamVisibility;

  @Field((type) => [Member])
  members: Member[];
}
