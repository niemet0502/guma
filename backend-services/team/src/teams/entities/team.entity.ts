import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Member } from '../../members/entities/member.entity';
import { TeamVisibility } from '../teams.enum';

@ObjectType()
@Directive('@key(fields: "id")')
export class Team {
  @Field(() => ID)
  id: number;

  @Field({ nullable: false })
  organization_id: number;

  @Field({ nullable: true })
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
