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
import { CurrentUser } from '../shared/current-user.decorator';
import { User } from '../shared/user.entity';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { Team } from './entities/team.entity';
import { TeamsService } from './teams.service';

@Resolver(() => Team)
export class TeamsResolver {
  constructor(private readonly teamsService: TeamsService) {}

  @Mutation(() => Team)
  createTeam(
    @Args('createTeamInput') createTeamInput: CreateTeamInput,
    @CurrentUser() user: User,
  ) {
    return this.teamsService.create(createTeamInput, user);
  }

  @Query(() => [Team], { name: 'teams' })
  findAll(@Args('project_id', { type: () => Int }) project_id: number) {
    return this.teamsService.findAllByOrganization(project_id);
  }

  @Query(() => Team, { name: 'team' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.teamsService.findOne(id);
  }

  @Query(() => Team, { name: 'getTeamByName' })
  findBy(
    @Args('name', { type: () => String }) name: string,
    @Args('project_id', { type: () => Int }) project_id: number,
  ) {
    return this.teamsService.findBy(name, project_id);
  }

  @Mutation(() => Team)
  updateTeam(@Args('updateTeamInput') updateTeamInput: UpdateTeamInput) {
    return this.teamsService.update(updateTeamInput.id, updateTeamInput);
  }

  @Mutation(() => Team)
  removeTeam(@Args('id', { type: () => Int }) id: number) {
    return this.teamsService.remove(id);
  }

  @ResolveField()
  async members(@Parent() team: Team) {
    const { id } = team;

    return await this.teamsService.getMembers(id);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<Team> {
    return this.teamsService.findOne(reference.id);
  }
}
