import { Module } from '@nestjs/common';
import { LivrablesService } from './livrables.service';
import { LivrablesController } from './livrables.controller';

@Module({
  controllers: [LivrablesController],
  providers: [LivrablesService]
})
export class LivrablesModule {}
