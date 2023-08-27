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
import { CreateTaskLabelDto } from './dto/create-tasklabel.dto';
import { TaskLabel } from './entities/tasklabel.entity';
import { TaskLabelService } from './tasklabel.service';

@Controller('tasklabels')
@ApiTags('tasklabels')
export class TaskLabelController {
  constructor(private readonly tasklabelService: TaskLabelService) {}

  @Post()
  @ApiCreatedResponse({ type: TaskLabel })
  async create(@Body() createTaskDto: CreateTaskLabelDto): Promise<TaskLabel> {
    return await this.tasklabelService.create(createTaskDto);
  }

  @Get()
  @ApiOkResponse({ type: TaskLabel, isArray: true })
  async findAll(
    @Query('task_id', ParseIntPipe) task_id: number,
  ): Promise<TaskLabel[]> {
    return await this.tasklabelService.findAllByTask(task_id);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TaskLabel })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<TaskLabel> {
    return await this.tasklabelService.remove(+id);
  }
}
