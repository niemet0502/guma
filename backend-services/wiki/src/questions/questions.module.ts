import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AnswersModule } from '../answers/answers.module';
import { QuestionsResolver } from './questions.resolver';
import { QuestionsService } from './questions.service';

@Module({
  imports: [HttpModule, AnswersModule],
  providers: [QuestionsResolver, QuestionsService],
})
export class QuestionsModule {}
