import { Field, InputType } from '@nestjs/graphql';
import { SprintStatusEnum } from '../sprint.enum';

@InputType()
export class CreateSprintInput {
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

  @Field({ nullable: true })
  status?: SprintStatusEnum;

  @Field({ nullable: false })
  team_id: number;
}
