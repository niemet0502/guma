import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [HttpModule, ProfilesModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
