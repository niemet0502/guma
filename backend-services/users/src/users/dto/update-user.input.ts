import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  is_suspended?: boolean;

  @Field({ nullable: true })
  first_signin?: boolean;

  @Field({ nullable: true })
  organization_id?: number;

  @Field({ nullable: true })
  profile_id?: number;
}
