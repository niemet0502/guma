import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsModule } from 'src/questions/questions.module';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { Answer } from './entities/answer.entity';
import { AnswerVote } from './entities/vote.entity';
import { AnswerVotesController } from './votes.controller';
import { AnswerVotesService } from './votes.services';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, AnswerVote]), QuestionsModule],
  controllers: [AnswersController, AnswerVotesController],
  providers: [AnswersService, AnswerVotesService],
})
export class AnswersModule {}
