import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { UsersModule } from 'src/users/users.module';
import { WorkflowModule } from 'src/workflow/workflow.module';
import { Member } from './entities/member.entity';
import { TaskStatus } from './entities/status.entity';
import { Team } from './entities/team.entity';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskStatus, Team, Member]),
    OrganizationsModule,
    UsersModule,
    forwardRef(() => WorkflowModule),
  ],
  controllers: [TeamsController, StatusController, MembersController],
  providers: [TeamsService, StatusService, MembersService],
  exports: [TeamsService, StatusService],
})
export class TeamsModule {}
