import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from '../shared/current-user.decator';
import { User } from '../shared/user.entity';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser() user: User,
  ) {
    return this.commentsService.create({
      ...createCommentInput,
      created_by: +user.id,
    });
  }

  @Query(() => [Comment], { name: 'comments' })
  findAll(
    @Args('task_id', { type: () => Int, nullable: true }) task_id: number,
    @Args('parent_id', { type: () => Int, nullable: true }) parent_id: number,
  ) {
    return this.commentsService.findAll(task_id, parent_id);
  }

  @Query(() => Comment, { name: 'comment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.commentsService.findOne(id);
  }

  @Mutation(() => Comment)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentsService.update(
      updateCommentInput.id,
      updateCommentInput,
    );
  }

  @Mutation(() => Comment)
  removeComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentsService.remove(id);
  }

  @ResolveField(() => User)
  author(@Parent() comment: Comment): any {
    return { __typename: 'User', id: comment.created_by };
  }

  @ResolveField()
  replies(@Parent() comment: Comment) {
    const { id } = comment;
    return this.commentsService.findAll(undefined, id);
  }
}
