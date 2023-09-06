import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ActivitiesModule } from './activities/activities.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
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
        orphanedTypes: [User, Team],
      },
    }),
    TasksModule,
    CommentsModule,
    ActivitiesModule,
    SprintsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
