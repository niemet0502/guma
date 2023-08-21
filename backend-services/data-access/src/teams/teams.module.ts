import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { TaskStatus } from './entities/status.entity';
import { Team } from './entities/team.entity';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskStatus, Team]), OrganizationsModule],
  controllers: [TeamsController, StatusController],
  providers: [TeamsService, StatusService],
})
export class TeamsModule {}
