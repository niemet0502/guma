import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { DocumentsService } from 'src/documents/documents.service';
import { Livrable } from './livrable.entity';

@Resolver(() => Livrable)
export class LivrableResolver {
  constructor(private readonly documentService: DocumentsService) {}

  @ResolveField(() => [Document])
  async documents(@Parent() livrable: Livrable): Promise<Document[]> {
    return await this.documentService.findAllByTeam(
      undefined,
      undefined,
      +livrable.id,
      undefined,
    );
  }
}
