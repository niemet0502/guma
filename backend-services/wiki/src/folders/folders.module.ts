import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DocumentsModule } from 'src/documents/documents.module';
import { FoldersResolver } from './folders.resolver';
import { FoldersService } from './folders.service';

@Module({
  imports: [HttpModule, DocumentsModule],
  providers: [FoldersResolver, FoldersService],
})
export class FoldersModule {}
