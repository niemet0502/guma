import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from '../shared/current-user.decator';
import { User } from '../shared/user.entity';
import { Task } from '../tasks/entities/task.entity';
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
  findAll(
    @Args('task_id', { type: () => Int, nullable: true }) task_id: number,
  ) {
    return this.remindersService.findAll(task_id);
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

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<Reminder> {
    return this.remindersService.findOne(reference.id);
  }

  @ResolveField(() => User)
  author(@Parent() reminder: Reminder): any {
    return { __typename: 'User', id: reminder.created_by };
  }

  @ResolveField(() => Task)
  task(@Parent() reminder: Reminder): any {
    return this.remindersService.getTask(reminder.task_id);
  }

  @ResolveField()
  receivers(@Parent() reminder: Reminder) {
    const { id } = reminder;
    return this.remindersService.getReceivers(id);
  }
}
