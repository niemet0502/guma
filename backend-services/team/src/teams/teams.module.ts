import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MembersModule } from 'src/members/members.module';
import { TeamsResolver } from './teams.resolver';
import { TeamsService } from './teams.service';

@Module({
  imports: [HttpModule, MembersModule],
  providers: [TeamsResolver, TeamsService],
})
export class TeamsModule {}
