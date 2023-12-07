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
import { User } from 'src/shared/user.entity';
import { Team } from '../shared/team.entity';
import { CreateFolderInput } from './dto/create-folder.input';
import { UpdateFolderInput } from './dto/update-folder.input';
import { Folder } from './entities/folder.entity';
import { FoldersService } from './folders.service';

@Resolver(() => Folder)
export class FoldersResolver {
  constructor(private readonly foldersService: FoldersService) {}

  @Mutation(() => Folder)
  createFolder(
    @Args('createFolderInput') createFolderInput: CreateFolderInput,
    @CurrentUser() user: User,
  ) {
    return this.foldersService.create({
      ...createFolderInput,
      created_by: +user.id,
    });
  }

  @Query(() => [Folder], { name: 'folders' })
  findAll(@Args('team_id', { type: () => Int }) team_id: number) {
    return this.foldersService.findAll(team_id);
  }

  @Query(() => Folder, { name: 'folder' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.foldersService.findOne(id);
  }

  @Mutation(() => Folder)
  updateFolder(
    @Args('updateFolderInput') updateFolderInput: UpdateFolderInput,
  ) {
    return this.foldersService.update(updateFolderInput.id, updateFolderInput);
  }

  @Mutation(() => Folder)
  removeFolder(@Args('id', { type: () => Int }) id: number) {
    return this.foldersService.remove(id);
  }

  @ResolveField()
  async documents(@Parent() folder: Folder): Promise<Document[]> {
    return await this.foldersService.getDocuments(folder);
  }

  @ResolveField(() => Team)
  team(@Parent() folder: Folder): any {
    return { __typename: 'Team', id: folder.team_id };
  }

  @ResolveField(() => User)
  author(@Parent() folder: Folder): any {
    if (!folder.created_by) return;
    return { __typename: 'User', id: folder.created_by };
  }
}
