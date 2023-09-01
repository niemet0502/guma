import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { UsersModule } from 'src/users/users.module';
import { Member } from './entities/member.entity';
import { TaskStatus } from './entities/status.entity';
import { Team } from './entities/team.entity';
import { Workflow } from './entities/workflow.entity';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { WorkflowController } from './workflow.controller';
import { WorkflowService } from './workflow.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskStatus, Team, Member, Workflow]),
    OrganizationsModule,
    UsersModule,
  ],
  controllers: [
    TeamsController,
    StatusController,
    MembersController,
    WorkflowController,
  ],
  providers: [TeamsService, StatusService, MembersService, WorkflowService],
  exports: [TeamsService, StatusService],
})
export class TeamsModule {}
