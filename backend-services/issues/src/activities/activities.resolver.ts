import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ActivitiesService } from './activities.service';
import { CreateActivityInput } from './dto/create-activity.input';
import { Activity } from './entities/activity.entity';

@Resolver(() => Activity)
export class ActivitiesResolver {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Mutation(() => Activity)
  createActivity(
    @Args('createActivityInput') createActivityInput: CreateActivityInput,
  ) {
    return this.activitiesService.create(createActivityInput);
  }

  @Query(() => [Activity], { name: 'activities' })
  findAll(@Args('task_id', { type: () => Int }) task_id: number) {
    return this.activitiesService.findAll(task_id);
  }

  @Query(() => Activity, { name: 'activity' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.activitiesService.findOne(id);
  }
}
