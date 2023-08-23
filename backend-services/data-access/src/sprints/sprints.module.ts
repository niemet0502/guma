import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsModule } from 'src/teams/teams.module';
import { Sprint } from './entities/sprint.entity';
import { SprintsController } from './sprints.controller';
import { SprintsService } from './sprints.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sprint]), TeamsModule],
  controllers: [SprintsController],
  providers: [SprintsService],
})
export class SprintsModule {}
