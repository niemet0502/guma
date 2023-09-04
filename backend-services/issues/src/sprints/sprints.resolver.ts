import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateSprintInput } from './dto/create-sprint.input';
import { UpdateSprintInput } from './dto/update-sprint.input';
import { Sprint } from './entities/sprint.entity';
import { SprintsService } from './sprints.service';

@Resolver(() => Sprint)
export class SprintsResolver {
  constructor(private readonly sprintsService: SprintsService) {}

  @Mutation(() => Sprint)
  createSprint(
    @Args('createSprintInput') createSprintInput: CreateSprintInput,
  ) {
    return this.sprintsService.create(createSprintInput);
  }

  @Query(() => [Sprint], { name: 'sprints' })
  findAll(@Args('team_id', { type: () => Int }) team_id: number) {
    return this.sprintsService.findAllByTeam(team_id);
  }

  @Query(() => Sprint, { name: 'sprint' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sprintsService.findOne(id);
  }

  @Mutation(() => Sprint)
  updateSprint(
    @Args('updateSprintInput') updateSprintInput: UpdateSprintInput,
  ) {
    return this.sprintsService.update(updateSprintInput.id, updateSprintInput);
  }

  @ResolveField()
  tasks(@Parent() sprint: Sprint) {
    const { id } = sprint;

    return this.sprintsService.getTasks(id);
  }
}
