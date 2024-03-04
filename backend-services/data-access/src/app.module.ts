import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesModule } from './activities/activities.module';
import { AnswersModule } from './answers/answers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from './database/data-source';
import { DocumentsModule } from './documents/documents.module';
import { LivrablesModule } from './livrables/livrables.module';
import { LoggerModule } from './logger/logger.module';
import { RequestLoggingMiddleware } from './middleware/request-logger.middleware';
import { NotificationsModule } from './notifications/notifications.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { QuestionsModule } from './questions/questions.module';
import { RemindersModule } from './reminders/reminders.module';
import { SprintsModule } from './sprints/sprints.module';
import { StatusModule } from './status/status.module';
import { TasksModule } from './tasks/tasks.module';
import { TeamsModule } from './teams/teams.module';
import { UsersModule } from './users/users.module';
import { WorkflowModule } from './workflow/workflow.module';

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
    RemindersModule,
    NotificationsModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
