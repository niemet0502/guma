import { Field, Int, ObjectType } from '@nestjs/graphql';
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
}
