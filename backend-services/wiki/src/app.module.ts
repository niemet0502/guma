import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsModule } from './documents/documents.module';
import { FoldersModule } from './folders/folders.module';
import { Team } from './shared/team.entity';
import { User } from './shared/user.entity';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';

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
    DocumentsModule,
    FoldersModule,
    QuestionsModule,
    AnswersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
