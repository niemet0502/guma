import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsModule } from 'src/teams/teams.module';
import { Livrable } from './entities/livrable.entity';
import { LivrableUpdate } from './entities/update.entity';
import { LivrablesController } from './livrables.controller';
import { LivrablesService } from './livrables.service';
import { LivrableUpdatesController } from './updates.controller';
import { LivrableUpdatesService } from './updates.service';

@Module({
  imports: [TypeOrmModule.forFeature([Livrable, LivrableUpdate]), TeamsModule],
  controllers: [LivrablesController, LivrableUpdatesController],
  providers: [LivrablesService, LivrableUpdatesService],
})
export class LivrablesModule {}
