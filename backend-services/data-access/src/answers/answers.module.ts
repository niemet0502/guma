import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { UsersModule } from 'src/users/users.module';
import { QuestionsModule } from '../questions/questions.module';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { Answer } from './entities/answer.entity';
import { AnswerVote } from './entities/vote.entity';
import { AnswerVotesController } from './votes.controller';
import { AnswerVotesService } from './votes.services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer, AnswerVote]),
    QuestionsModule,
    UsersModule,
  ],
  controllers: [AnswersController, AnswerVotesController],
  providers: [AnswersService, AnswerVotesService],
})
export class AnswersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(AnswerVotesController, AnswersController);
  }
}
