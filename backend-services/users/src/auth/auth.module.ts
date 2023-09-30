import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [HttpModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
