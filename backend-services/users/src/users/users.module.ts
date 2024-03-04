import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [HttpModule, ProfilesModule, LoggerModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
