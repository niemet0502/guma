import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { Team } from './entities/team.entity';
import { TeamsService } from './teams.service';

@Resolver(() => Team)
export class TeamsResolver {
  constructor(private readonly teamsService: TeamsService) {}

  @Mutation(() => Team)
  createTeam(@Args('createTeamInput') createTeamInput: CreateTeamInput) {
    return this.teamsService.create(createTeamInput);
  }

  @Query(() => [Team], { name: 'teams' })
  findAll(
    @Args('organization_id', { type: () => Int }) organization_id: number,
  ) {
    return this.teamsService.findAllByOrganization(organization_id);
  }

  @Query(() => Team, { name: 'team' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.teamsService.findOne(id);
  }

  @Mutation(() => Team)
  updateTeam(@Args('updateTeamInput') updateTeamInput: UpdateTeamInput) {
    return this.teamsService.update(updateTeamInput.id, updateTeamInput);
  }

  @Mutation(() => Team)
  removeTeam(@Args('id', { type: () => Int }) id: number) {
    return this.teamsService.remove(id);
  }
}
