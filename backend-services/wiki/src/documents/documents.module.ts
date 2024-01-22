import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LivrableResolver } from '../shared/livrables.resolver';
import { TaskResolver } from '../shared/tasks.resolver';
import { DocumentsResolver } from './documents.resolver';
import { DocumentsService } from './documents.service';

@Module({
  imports: [HttpModule],
  providers: [
    DocumentsResolver,
    DocumentsService,
    TaskResolver,
    LivrableResolver,
  ],
  exports: [DocumentsService],
})
export class DocumentsModule {}
