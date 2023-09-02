import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Status } from '../../status/entities/status.entity';

@ObjectType()
export class Workflow {
  @Field(() => Int)
  id: number;

  @Field({ nullable: false })
  team_id: number;

  @Field({ nullable: false })
  status_id: number;

  @Field({ nullable: false })
  order_value: number;

  @Field((type) => Status)
  status?: Status;
}
