import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAuthInput {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  password: string;
}
