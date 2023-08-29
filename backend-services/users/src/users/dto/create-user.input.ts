import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  lastname: string;

  @Field()
  firstname: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  organization_id: number;

  @Field()
  profile_id: number;

  @Field()
  team_id: number;
}
