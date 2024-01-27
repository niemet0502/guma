import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Status {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  state: number;

  @Field({ nullable: true })
  team_id?: number;
}
