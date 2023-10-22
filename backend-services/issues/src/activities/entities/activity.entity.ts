import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Status } from 'src/shared/status.entity';
import { ActivityAction } from 'src/shared/tasks.enum';
import { User } from '../../shared/user.entity';
import { Sprint } from '../../sprints/entities/sprint.entity';

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

  @Field((type) => Sprint, { nullable: true })
  sprint?: Sprint;

  @Field()
  action: ActivityAction;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  @Field({
    nullable: true,
  })
  priority?: number;

  @Field({
    nullable: true,
  })
  assignee_to?: number;

  @Field((type) => Status, { nullable: true })
  from?: Status;

  @Field((type) => Status, { nullable: true })
  to?: Status;

  @Field((type) => User, { nullable: true })
  assignee?: User;
}
