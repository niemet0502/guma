import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ActivitiesModule } from './activities/activities.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { TaskLabelsModule } from './labels/labels.module';
import { LivrablesModule } from './livrables/livrables.module';
import { LivrableupdatesModule } from './livrableupdates/livrableupdates.module';
import { LoggerModule } from './logger/logger.module';
import { RequestLoggingMiddleware } from './middleware/request-logging.middleware';
import { ReminderreceiversModule } from './reminderreceivers/reminderreceivers.module';
import { RemindersModule } from './reminders/reminders.module';
import { Status } from './shared/status.entity';
import { Team } from './shared/team.entity';
import { User } from './shared/user.entity';
import { SprintsModule } from './sprints/sprints.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      buildSchemaOptions: {
        orphanedTypes: [User, Team, Status],
      },
    }),
    TasksModule,
    CommentsModule,
    ActivitiesModule,
    SprintsModule,
    TaskLabelsModule,
    LivrablesModule,
    LivrableupdatesModule,
    RemindersModule,
    ReminderreceiversModule,
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
