import { HttpModule } from '@nestjs/axios';
import { Module, forwardRef } from '@nestjs/common';
import { TeamsModule } from '../teams/teams.module';
import { MembersResolver } from './members.resolver';
import { MembersService } from './members.service';

@Module({
  imports: [HttpModule, forwardRef(() => TeamsModule)],
  providers: [MembersResolver, MembersService],
  exports: [MembersService],
})
export class MembersModule {}
