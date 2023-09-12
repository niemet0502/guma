import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMemberInput {
  @Field({ nullable: false })
  team_id: number;

  @Field({ nullable: false })
  user_id: number;
}
