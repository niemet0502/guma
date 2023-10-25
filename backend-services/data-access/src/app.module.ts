import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './database/data-source';
import { OrganizationsModule } from './organizations/organizations.module';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { TasksModule } from './tasks/tasks.module';
import { DocumentsModule } from './documents/documents.module';
import { AuthModule } from './auth/auth.module';
import { SprintsModule } from './sprints/sprints.module';
import { WorkflowModule } from './workflow/workflow.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), OrganizationsModule, UsersModule, TeamsModule, TasksModule, DocumentsModule, AuthModule, SprintsModule, WorkflowModule, StatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
