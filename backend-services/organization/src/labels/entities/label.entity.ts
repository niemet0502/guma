import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Label {
  @Field(() => Int)
  id: number;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  organization_id: number;
}
