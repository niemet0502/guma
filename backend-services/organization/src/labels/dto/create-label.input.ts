import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLabelInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  project_id: number;

  @Field({ nullable: true })
  team_id: number;
}
