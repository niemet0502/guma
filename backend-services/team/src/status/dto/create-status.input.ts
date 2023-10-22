import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStatusInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  team_id?: number;
}
