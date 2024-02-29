import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { NotificationsResolver } from './notifications.resolver';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [HttpModule, LoggerModule],
  providers: [NotificationsResolver, NotificationsService],
})
export class NotificationsModule {}
