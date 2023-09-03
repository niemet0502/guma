import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@ApiTags('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiCreatedResponse({ type: Task })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOkResponse({ type: Task, isArray: true })
  findAll(
    @Query('team_id') team_id?: string,
    @Query('type') type?: string,
    @Query('status_id') status_id?: string,
    @Query('parent_task_id') parent_task_id?: string,
  ): Promise<Task[]> {
    // TODO add search params

    return this.tasksService.findAll(
      +team_id,
      +type,
      +status_id,
      +parent_task_id,
    );
  }

  @Get(':id')
  @ApiOkResponse({ type: Task })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Task })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Task })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
