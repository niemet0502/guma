import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsModule } from 'src/teams/teams.module';
import { Livrable } from './entities/livrable.entity';
import { LivrablesController } from './livrables.controller';
import { LivrablesService } from './livrables.service';

@Module({
  imports: [TypeOrmModule.forFeature([Livrable]), TeamsModule],
  controllers: [LivrablesController],
  providers: [LivrablesService],
})
export class LivrablesModule {}
