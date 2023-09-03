import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

@Module({
  imports: [HttpModule],
  providers: [CommentsResolver, CommentsService],
})
export class CommentsModule {}
