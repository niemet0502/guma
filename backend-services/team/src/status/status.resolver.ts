import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStatusInput } from './dto/create-status.input';
import { UpdateStatusInput } from './dto/update-status.input';
import { Status } from './entities/status.entity';
import { StatusService } from './status.service';

@Resolver(() => Status)
export class StatusResolver {
  constructor(private readonly statusService: StatusService) {}

  @Mutation(() => Status)
  createStatus(
    @Args('createStatusInput') createStatusInput: CreateStatusInput,
  ) {
    return this.statusService.create(createStatusInput);
  }

  @Query(() => [Status], { name: 'status' })
  findAll(@Args('team_id', { type: () => Int }) team_id: number) {
    return this.statusService.findAllByTeam(team_id);
  }

  @Mutation(() => Status)
  updateStatus(
    @Args('updateStatusInput') updateStatusInput: UpdateStatusInput,
  ) {
    return this.statusService.update(updateStatusInput.id, updateStatusInput);
  }

  @Mutation(() => Status)
  removeStatus(@Args('id', { type: () => Int }) id: number) {
    return this.statusService.remove(id);
  }
}
