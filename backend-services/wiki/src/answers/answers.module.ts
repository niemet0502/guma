import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AnswersResolver } from './answers.resolver';
import { AnswersService } from './answers.service';

@Module({
  imports: [HttpModule],
  providers: [AnswersResolver, AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
