import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from '../shared/current-user.decator';
import { Status } from '../shared/status.entity';
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
    @CurrentUser() user: User,
  ) {
    return this.activitiesService.create({
      ...createActivityInput,
      created_by: +user.id,
    });
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
    if (!sprint_id) return;
    return await this.activitiesService.getSprint(sprint_id);
  }

  @ResolveField((of) => Status)
  from(@Parent() activity: Activity): any {
    if (!activity.from_status) return;
    return { __typename: 'Status', id: activity.from_status };
  }

  @ResolveField((of) => Status)
  to(@Parent() activity: Activity): any {
    if (!activity.to_status) return;
    return { __typename: 'Status', id: activity.to_status };
  }

  @ResolveField((of) => Status)
  assignee(@Parent() activity: Activity): any {
    if (!activity.assignee_to) return;
    return { __typename: 'User', id: activity.assignee_to };
  }
}
