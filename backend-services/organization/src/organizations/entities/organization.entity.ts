import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Organization {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  size: string;

  @Field({ nullable: true })
  logo?: string;
}
