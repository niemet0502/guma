import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ActivityAction } from 'src/shared/tasks.enum';
import { User } from '../../shared/user.entity';

@ObjectType()
export class Activity {
  @Field(() => Int)
  id: number;

  @Field({ nullable: false })
  created_by: number;

  @Field(() => User)
  author?: User;

  @Field({ nullable: false })
  task_id: number;

  @Field({
    nullable: true,
  })
  from_status: number;

  @Field({
    nullable: true,
  })
  to_status: number;

  @Field({
    nullable: true,
  })
  sprint_id: number;

  @Field()
  action: ActivityAction;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;
}
