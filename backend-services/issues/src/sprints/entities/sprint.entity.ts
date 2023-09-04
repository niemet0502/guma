import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Sprint {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  duration: number;

  @Field({ nullable: false })
  start_at: string;

  @Field({ nullable: false })
  end_at: string;

  @Field({ nullable: true })
  goal: string;

  @Field({ nullable: false })
  team_id: number;
}
