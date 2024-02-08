import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { NotificationsResolver } from './notifications.resolver';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [HttpModule],
  providers: [NotificationsResolver, NotificationsService],
})
export class NotificationsModule {}
