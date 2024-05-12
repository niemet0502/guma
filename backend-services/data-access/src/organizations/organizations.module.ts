import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { LoggerModule } from '../logger/logger.module';
import { UsersModule } from '../users/users.module';
import { Label } from './entities/label.entity';
import { Project } from './entities/project.entity';
import { LabelService } from './label.service';
import { LabelController } from './labels.controller';
import { ProjectsController } from './organizations.controller';
import { ProjectsService } from './organizations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Label]),
    LoggerModule,
    UsersModule,
  ],
  controllers: [ProjectsController, LabelController],
  providers: [ProjectsService, LabelService],
  exports: [ProjectsService, LabelService],
})
export class OrganizationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(LabelController, ProjectsController);
  }
}
