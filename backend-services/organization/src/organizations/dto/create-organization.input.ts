import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrganizationInput {
  @Field()
  name: string;

  @Field()
  size: string;

  @Field({ nullable: true })
  logo?: string;
}
