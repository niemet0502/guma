import { Field, InputType } from '@nestjs/graphql';
import { TeamVisibility } from '../teams.enum';

@InputType()
export class CreateTeamInput {
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
