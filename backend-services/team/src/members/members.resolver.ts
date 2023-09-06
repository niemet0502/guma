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
import { User } from '../shared/user.entity';
import { Team } from '../teams/entities/team.entity';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { Member } from './entities/member.entity';
import { MembersService } from './members.service';

@Resolver(() => Member)
export class MembersResolver {
  constructor(private readonly membersService: MembersService) {}

  @Mutation(() => Member)
  createMember(
    @Args('createMemberInput') createMemberInput: CreateMemberInput,
  ) {
    return this.membersService.create(createMemberInput);
  }

  @Query(() => [Member], { name: 'members' })
  findAll(
    @Args('team_id', { type: () => Int }) team_id: number,
    @Args('user_id', { type: () => Int }) user_id: number,
  ) {
    return this.membersService.findAllByTeam(team_id, user_id);
  }

  @Query(() => Member, { name: 'member' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.membersService.findOne(id);
  }

  @Mutation(() => Member)
  updateMember(
    @Args('updateMemberInput') updateMemberInput: UpdateMemberInput,
  ) {
    return this.membersService.update(updateMemberInput.id, updateMemberInput);
  }

  @Mutation(() => Member)
  removeMember(@Args('id', { type: () => Int }) id: number) {
    return this.membersService.remove(id);
  }

  @ResolveField(() => User)
  user(@Parent() member: Member): any {
    return { __typename: 'User', id: member.user_id };
  }

  @ResolveField(() => Team)
  async team(@Parent() member: Member): Promise<Team> {
    const { team_id } = member;
    return await this.membersService.getTeam(team_id);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<Member[]> {
    return this.membersService.findAllByTeam(undefined, reference.id);
  }
}
