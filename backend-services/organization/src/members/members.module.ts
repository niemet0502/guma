import { HttpModule } from '@nestjs/axios';
import { Module, forwardRef } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { MembersResolver } from './members.resolver';
import { MembersService } from './members.service';

@Module({
  imports: [HttpModule, LoggerModule, forwardRef(() => OrganizationsModule)],
  providers: [MembersResolver, MembersService],
  exports: [MembersService],
})
export class MembersModule {}
