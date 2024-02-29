import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [HttpModule, LoggerModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
