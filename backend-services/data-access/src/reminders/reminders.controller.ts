import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { Reminder } from './entities/reminder.entity';
import { RemindersService } from './reminders.service';

@Controller('reminders')
@ApiTags('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  @ApiCreatedResponse({ type: Reminder })
  create(@Body() createReminderDto: CreateReminderDto) {
    return this.remindersService.create(createReminderDto);
  }

  @Get()
  @ApiOkResponse({ type: Reminder, isArray: true })
  findAll() {
    return this.remindersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Reminder })
  findOne(@Param('id') id: string) {
    return this.remindersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Reminder })
  update(
    @Param('id') id: string,
    @Body() updateReminderDto: UpdateReminderDto,
  ) {
    return this.remindersService.update(+id, updateReminderDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Reminder })
  remove(@Param('id') id: string) {
    return this.remindersService.remove(+id);
  }
}
