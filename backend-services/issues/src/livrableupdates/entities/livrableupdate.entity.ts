import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Livrableupdate {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  status: number;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  created_by?: number;

  @Field({ nullable: false })
  livrable_id: number;

  @Field({ nullable: false })
  created_at: string;
}
