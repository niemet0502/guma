import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LivrablesResolver } from './livrables.resolver';
import { LivrablesService } from './livrables.service';

@Module({
  imports: [HttpModule],
  providers: [LivrablesResolver, LivrablesService],
})
export class LivrablesModule {}
