import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsModule } from '../teams/teams.module';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { Document } from './entities/document.entity';
import { Folder } from './entities/folder.entity';
import { FolderController } from './folders.controller';
import { FolderService } from './folders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Document, Folder]), TeamsModule],
  controllers: [DocumentsController, FolderController],
  providers: [DocumentsService, FolderService],
})
export class DocumentsModule {}
