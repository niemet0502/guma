import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
  @Field()
  name: string;
}
