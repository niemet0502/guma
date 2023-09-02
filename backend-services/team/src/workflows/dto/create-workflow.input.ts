import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateWorkflowInput {
  @Field({ nullable: false })
  team_id: number;

  @Field({ nullable: false })
  status_id: number;

  @Field({ nullable: false })
  order_value: number;
}
