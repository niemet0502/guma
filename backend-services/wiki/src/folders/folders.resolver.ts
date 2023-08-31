import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
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
  ) {
    return this.foldersService.create(createFolderInput);
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
}
