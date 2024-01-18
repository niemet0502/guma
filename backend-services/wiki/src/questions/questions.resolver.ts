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
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './entities/question.entity';
import { QuestionsService } from './questions.service';

@Resolver(() => Question)
export class QuestionsResolver {
  constructor(private readonly questionsService: QuestionsService) {}

  @Mutation(() => Question)
  createQuestion(
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
  ) {
    return this.questionsService.create(createQuestionInput);
  }

  @Query(() => [Question], { name: 'questions' })
  findAll() {
    return this.questionsService.findAll();
  }

  @Query(() => Question, { name: 'question' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.questionsService.findOne(id);
  }

  @Mutation(() => Question)
  updateQuestion(
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ) {
    return this.questionsService.update(
      updateQuestionInput.id,
      updateQuestionInput,
    );
  }

  @Mutation(() => Question)
  removeQuestion(@Args('id', { type: () => Int }) id: number) {
    return this.questionsService.remove(id);
  }

  @ResolveField()
  answers(@Parent() question: Question) {
    const { id } = question;

    return this.questionsService.getAnswers(id);
  }

  @ResolveField(() => User)
  author(@Parent() doc: Question): any {
    return { __typename: 'User', id: doc.created_by };
  }
}
