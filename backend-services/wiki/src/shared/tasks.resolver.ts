import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { DocumentsService } from 'src/documents/documents.service';
import { Task } from './task.entity';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly documentService: DocumentsService) {}

  @ResolveField(() => [Document])
  async documents(@Parent() task: Task): Promise<Document[]> {
    return await this.documentService.findAllByTeam(
      undefined,
      undefined,
      undefined,
      +task.id,
    );
  }
}
