import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { VotesResolver } from './votes.resolver';
import { VotesService } from './votes.service';

@Module({
  imports: [HttpModule],
  providers: [VotesResolver, VotesService],
  exports: [VotesService],
})
export class VotesModule {}
