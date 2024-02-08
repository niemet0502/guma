import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateReminderReceiversDto } from './dto/create-reminderreceivers.dto';
import { ReminderReceiversIds } from './entities/reminderusers.entity';
import { ReminderReceiversService } from './reminderreceivers.service';

@Controller('reminderreceivers')
@ApiTags('reminderreceivers')
export class ReminderReceiversController {
  constructor(private readonly service: ReminderReceiversService) {}

  @Post()
  @ApiCreatedResponse({ type: ReminderReceiversIds })
  async create(
    @Body() createTaskDto: CreateReminderReceiversDto,
  ): Promise<ReminderReceiversIds> {
    return await this.service.create(createTaskDto);
  }

  @Get()
  @ApiOkResponse({ type: ReminderReceiversIds, isArray: true })
  async findAll(
    @Query('reminder_id', ParseIntPipe) reminder_id: number,
  ): Promise<ReminderReceiversIds[]> {
    return await this.service.findAllByReminder(reminder_id);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ReminderReceiversIds })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReminderReceiversIds> {
    return await this.service.remove(+id);
  }
}
