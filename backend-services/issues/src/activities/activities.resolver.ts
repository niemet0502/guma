import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../shared/user.entity';
import { Sprint } from '../sprints/entities/sprint.entity';
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

  @ResolveField(() => User)
  author(@Parent() activity: Activity): any {
    return { __typename: 'User', id: activity.created_by };
  }

  @ResolveField((type) => Sprint)
  async sprint(@Parent() activity: Activity) {
    const { sprint_id } = activity;
    return await this.activitiesService.getSprint(sprint_id);
  }
}
