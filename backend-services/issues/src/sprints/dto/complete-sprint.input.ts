import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CompleteSprintInput {
  @Field({ nullable: false })
  id: number;

  @Field({ nullable: false })
  isCompleted: boolean;

  @Field({ nullable: true })
  destination?: number;

  @Field(() => [Int], { nullable: true })
  unCompletedTasksIds?: number[];

  @Field({ nullable: true })
  totalTasksCounter?: number;
}
