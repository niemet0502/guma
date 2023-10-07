import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Label {
  @Field(() => ID)
  id: number;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  organization_id: number;
}
