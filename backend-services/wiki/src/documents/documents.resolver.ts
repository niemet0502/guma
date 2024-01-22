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
import { CurrentUser } from '../shared/current-user.decator';
import { Team } from '../shared/team.entity';
import { User } from '../shared/user.entity';
import { DocumentsService } from './documents.service';
import { CreateDocumentInput } from './dto/create-document.input';
import { UpdateDocumentInput } from './dto/update-document.input';
import { Document } from './entities/document.entity';

@Resolver(() => Document)
export class DocumentsResolver {
  constructor(private readonly documentsService: DocumentsService) {}

  @Mutation(() => Document)
  createDocument(
    @Args('createDocumentInput') createDocumentInput: CreateDocumentInput,
    @CurrentUser() user: User,
  ) {
    // TODO get the user.id from the context
    return this.documentsService.create({
      ...createDocumentInput,
      created_by: +user.id,
    });
  }

  @Query(() => [Document], { name: 'documents' })
  findAll(
    @Args('team_id', { type: () => Int, nullable: true }) team_id: number,
    @Args('folder_id', { type: () => Int, nullable: true }) folder_id: number,
    @Args('livrable_id', { type: () => Int, nullable: true })
    livrable_id: number,
    @Args('task_id', { type: () => Int, nullable: true }) task_id: number,
  ) {
    return this.documentsService.findAllByTeam(
      team_id,
      folder_id,
      livrable_id,
      task_id,
    );
  }

  @Query(() => Document, { name: 'document' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.documentsService.findOne(id);
  }

  @Mutation(() => Document)
  updateDocument(
    @Args('updateDocumentInput') updateDocumentInput: UpdateDocumentInput,
  ) {
    return this.documentsService.update(
      updateDocumentInput.id,
      updateDocumentInput,
    );
  }

  @Mutation(() => Document)
  removeDocument(@Args('id', { type: () => Int }) id: number) {
    return this.documentsService.remove(id);
  }

  @ResolveField(() => User)
  author(@Parent() doc: Document): any {
    return { __typename: 'User', id: doc.created_by };
  }

  @ResolveField(() => Team)
  team(@Parent() doc: Document): any {
    return { __typename: 'Team', id: doc.team_id };
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    return this.documentsService.findOne(reference.id);
  }
}
