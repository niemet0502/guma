import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateLivrableupdateInput {
  @Field(() => Int)
  status: number;

  @Field({ nullable: true })
  description: string;

  @Field(() => Int, { nullable: false })
  livrable_id: number;

  @Field({ nullable: true })
  created_by?: number;
}
