import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Task } from '../../tasks/entities/task.entity';
import { SprintStatusEnum } from '../sprint.enum';

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

  @Field()
  status: SprintStatusEnum;

  @Field({ nullable: false })
  end_at: string;

  @Field({ nullable: true })
  goal: string;

  @Field({ nullable: false })
  team_id: number;

  @Field({ nullable: true })
  isCompleted: boolean;

  @Field({ nullable: true })
  unCompletedTasksUponClose: number;

  @Field({ nullable: true })
  totalTasksUponClose: number;

  @Field((type) => [Task])
  tasks: Task[];

  @Field((type) => [Task], { nullable: true })
  unClosedTasks?: Task[];
}
