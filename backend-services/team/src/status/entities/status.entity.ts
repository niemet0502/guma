import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Status {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  team_id: number;
}
