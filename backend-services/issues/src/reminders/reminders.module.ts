import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RemindersResolver } from './reminders.resolver';
import { RemindersService } from './reminders.service';

@Module({
  imports: [HttpModule],
  providers: [RemindersResolver, RemindersService],
  exports: [RemindersService],
})
export class RemindersModule {}
