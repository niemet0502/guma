import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLivrableInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: false })
  end_at: string;

  @Field({ nullable: false })
  start_at: string;

  @Field({ nullable: true })
  status: number;

  @Field({ nullable: false })
  team_id: number;

  @Field({ nullable: true })
  created_by?: number;
}
