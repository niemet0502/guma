import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { TeamsModule } from '../teams/teams.module';
import { UsersModule } from '../users/users.module';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { Document } from './entities/document.entity';
import { Folder } from './entities/folder.entity';
import { FolderController } from './folders.controller';
import { FolderService } from './folders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document, Folder]),
    TeamsModule,
    UsersModule,
  ],
  controllers: [DocumentsController, FolderController],
  providers: [DocumentsService, FolderService],
})
export class DocumentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(DocumentsController, FolderController);
  }
}
