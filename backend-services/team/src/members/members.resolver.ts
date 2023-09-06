import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../shared/user.entity';
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
  findAll(@Args('team_id', { type: () => Int }) team_id: number) {
    return this.membersService.findAllByTeam(team_id);
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
}
