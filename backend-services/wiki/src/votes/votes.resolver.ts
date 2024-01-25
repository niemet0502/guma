import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/shared/current-user.decator';
import { User } from '../shared/user.entity';
import { CreateVoteInput } from './dto/create-vote.input';
import { UpdateVoteInput } from './dto/update-vote.input';
import { Vote } from './entities/vote.entity';
import { VotesService } from './votes.service';

@Resolver(() => Vote)
export class VotesResolver {
  constructor(private readonly votesService: VotesService) {}

  @Mutation(() => Vote)
  createVote(
    @Args('createVoteInput') createVoteInput: CreateVoteInput,
    @CurrentUser() user: User,
  ) {
    return this.votesService.create({
      ...createVoteInput,
      created_by: +user.id,
    });
  }

  @Query(() => [Vote], { name: 'votes' })
  findAll(@Args('answer_id', { type: () => Int }) answer_id: number) {
    return this.votesService.findAllByAnswer(answer_id);
  }

  @Query(() => Vote, { name: 'vote' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.votesService.findOne(id);
  }

  @Mutation(() => Vote)
  updateVote(@Args('updateVoteInput') updateVoteInput: UpdateVoteInput) {
    return this.votesService.update(updateVoteInput.id, updateVoteInput);
  }

  @Mutation(() => Vote)
  removeVote(@Args('id', { type: () => Int }) id: number) {
    return this.votesService.remove(id);
  }

  @ResolveField(() => User)
  author(@Parent() doc: Vote): any {
    return { __typename: 'User', id: doc.created_by };
  }
}
