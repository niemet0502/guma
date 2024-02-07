import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from 'src/shared/user.entity';
import { CreateReminderreceiverInput } from './dto/create-reminderreceiver.input';
import { ReminderReceiver } from './entities/reminderreceiver.entity';
import { ReminderreceiversService } from './reminderreceivers.service';

@Resolver(() => ReminderReceiver)
export class ReminderreceiversResolver {
  constructor(
    private readonly reminderreceiversService: ReminderreceiversService,
  ) {}

  @Mutation(() => ReminderReceiver)
  createReminderreceiver(
    @Args('createReminderreceiverInput')
    createReminderreceiverInput: CreateReminderreceiverInput,
  ) {
    return this.reminderreceiversService.create(createReminderreceiverInput);
  }

  @Query(() => [ReminderReceiver], { name: 'reminderreceivers' })
  findAll(@Args('reminder_id', { type: () => Int }) reminder_id: number) {
    return this.reminderreceiversService.findAllByReminder(reminder_id);
  }

  @ResolveField(() => User)
  user(@Parent() reminder: ReminderReceiver): any {
    return { __typename: 'User', id: reminder.user_id };
  }
}
