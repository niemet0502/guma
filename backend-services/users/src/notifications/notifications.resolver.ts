import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Reminder } from 'src/shared/reminder.entity';
import { Notification } from './entities/notification.entity';
import { NotificationsService } from './notifications.service';

@Resolver(() => Notification)
export class NotificationsResolver {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Query(() => [Notification], { name: 'notifications' })
  findAll(@Args('user_id', { type: () => Int }) user_id: number) {
    return this.notificationsService.findAllByUser(user_id);
  }

  @Query(() => Notification, { name: 'notification' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.notificationsService.findOne(id);
  }

  @ResolveField((of) => Reminder)
  reminder(@Parent() task: Notification): any {
    return { __typename: 'Reminder', id: task.reminder_id };
  }
}
