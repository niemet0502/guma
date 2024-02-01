import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reminder } from './entities/reminder.entity';
import { RemindersController } from './reminders.controller';
import { RemindersService } from './reminders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reminder])],
  controllers: [RemindersController],
  providers: [RemindersService],
})
export class RemindersModule {}
