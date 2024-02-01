import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../shared/current-user.decator';
import { User } from '../shared/user.entity';
import { CreateReminderInput } from './dto/create-reminder.input';
import { UpdateReminderInput } from './dto/update-reminder.input';
import { Reminder } from './entities/reminder.entity';
import { RemindersService } from './reminders.service';

@Resolver(() => Reminder)
export class RemindersResolver {
  constructor(private readonly remindersService: RemindersService) {}

  @Mutation(() => Reminder)
  createReminder(
    @Args('createReminderInput') createReminderInput: CreateReminderInput,
    @CurrentUser() user: User,
  ) {
    return this.remindersService.create({
      ...createReminderInput,
      created_by: +user.id,
    });
  }

  @Query(() => [Reminder], { name: 'reminders' })
  findAll() {
    return this.remindersService.findAll();
  }

  @Query(() => Reminder, { name: 'reminder' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.remindersService.findOne(id);
  }

  @Mutation(() => Reminder)
  updateReminder(
    @Args('updateReminderInput') updateReminderInput: UpdateReminderInput,
  ) {
    return this.remindersService.update(
      updateReminderInput.id,
      updateReminderInput,
    );
  }

  @Mutation(() => Reminder)
  removeReminder(@Args('id', { type: () => Int }) id: number) {
    return this.remindersService.remove(id);
  }
}
