import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsModule } from 'src/teams/teams.module';
import { TaskStatus } from './entities/status.entity';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskStatus]),
    forwardRef(() => TeamsModule),
  ],
  controllers: [StatusController],
  providers: [StatusService],
  exports: [StatusService],
})
export class StatusModule {}
