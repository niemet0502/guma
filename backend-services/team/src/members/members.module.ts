import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MembersResolver } from './members.resolver';
import { MembersService } from './members.service';

@Module({
  imports: [HttpModule],
  providers: [MembersResolver, MembersService],
})
export class MembersModule {}
