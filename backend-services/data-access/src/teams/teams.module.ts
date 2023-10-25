import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { StatusModule } from 'src/status/status.module';
import { UsersModule } from 'src/users/users.module';
import { WorkflowModule } from 'src/workflow/workflow.module';
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
  ],
  controllers: [TeamsController, MembersController],
  providers: [TeamsService, MembersService],
  exports: [TeamsService],
})
export class TeamsModule {}
