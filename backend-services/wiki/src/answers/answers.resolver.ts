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
import { AnswersService } from './answers.service';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Answer } from './entities/answer.entity';

@Resolver(() => Answer)
export class AnswersResolver {
  constructor(private readonly answersService: AnswersService) {}

  @Mutation(() => Answer)
  createAnswer(
    @Args('createAnswerInput') createAnswerInput: CreateAnswerInput,
    @CurrentUser() user: User,
  ) {
    return this.answersService.create({
      ...createAnswerInput,
      created_by: +user.id,
    });
  }

  @Query(() => [Answer], { name: 'answers' })
  findAll(@Args('question_id', { type: () => Int }) question_id: number) {
    return this.answersService.findAllByQuestion(question_id);
  }

  @Query(() => Answer, { name: 'answer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.answersService.findOne(id);
  }

  @Mutation(() => Answer)
  updateAnswer(
    @Args('updateAnswerInput') updateAnswerInput: UpdateAnswerInput,
  ) {
    return this.answersService.update(updateAnswerInput.id, updateAnswerInput);
  }

  @Mutation(() => Answer)
  removeAnswer(@Args('id', { type: () => Int }) id: number) {
    return this.answersService.remove(id);
  }

  @ResolveField(() => User)
  author(@Parent() doc: Answer): any {
    return { __typename: 'User', id: doc.created_by };
  }

  @ResolveField()
  votes(@Parent() question: Answer) {
    const { id } = question;

    return this.answersService.getVotes(id);
  }
}
