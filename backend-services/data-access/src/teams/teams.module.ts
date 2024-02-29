import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/logger/logger.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { StatusModule } from '../status/status.module';
import { UsersModule } from '../users/users.module';
import { WorkflowModule } from '../workflow/workflow.module';
import { Member } from './entities/member.entity';
import { Team } from './entities/team.entity';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, Member]),
    OrganizationsModule,
    UsersModule,
    forwardRef(() => WorkflowModule),
    forwardRef(() => StatusModule),
    LoggerModule,
  ],
  controllers: [TeamsController, MembersController],
  providers: [TeamsService, MembersService],
  exports: [TeamsService],
})
export class TeamsModule {}
