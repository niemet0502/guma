import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesModule } from './activities/activities.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from './database/data-source';
import { DocumentsModule } from './documents/documents.module';
import { LivrablesModule } from './livrables/livrables.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { SprintsModule } from './sprints/sprints.module';
import { StatusModule } from './status/status.module';
import { TasksModule } from './tasks/tasks.module';
import { TeamsModule } from './teams/teams.module';
import { UsersModule } from './users/users.module';
import { WorkflowModule } from './workflow/workflow.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';

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
    StatusModule,
    ActivitiesModule,
    LivrablesModule,
    WorkflowModule,
    QuestionsModule,
    AnswersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
