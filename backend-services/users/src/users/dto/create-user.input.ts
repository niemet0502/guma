import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  organization_id: number;

  @Field()
  profile_id: number;

  @Field({ nullable: true })
  team_id?: number;
}
