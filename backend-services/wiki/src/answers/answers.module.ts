import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { VotesModule } from 'src/votes/votes.module';
import { AnswersResolver } from './answers.resolver';
import { AnswersService } from './answers.service';

@Module({
  imports: [HttpModule, VotesModule],
  providers: [AnswersResolver, AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
