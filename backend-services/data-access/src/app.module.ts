import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from './database/data-source';
import { DocumentsModule } from './documents/documents.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { SprintsModule } from './sprints/sprints.module';
import { StatusModule } from './status/status.module';
import { TasksModule } from './tasks/tasks.module';
import { TeamsModule } from './teams/teams.module';
import { UsersModule } from './users/users.module';
import { WorkflowModule } from './workflow/workflow.module';
import { ActivitiesModule } from './activities/activities.module';
import { ModulesModule } from './modules/modules.module';
import { LivrablesModule } from './livrables/livrables.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    OrganizationsModule,
    UsersModule,
    TeamsModule,
    TasksModule,
    DocumentsModule,
    AuthModule,
    SprintsModule,
    WorkflowModule,
    StatusModule,
    ActivitiesModule,
    ModulesModule,
    LivrablesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
