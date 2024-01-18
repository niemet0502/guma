import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { QuestionsResolver } from './questions.resolver';
import { QuestionsService } from './questions.service';

@Module({
  imports: [HttpModule],
  providers: [QuestionsResolver, QuestionsService],
})
export class QuestionsModule {}
