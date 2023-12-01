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
    @Query('status_name') status_name?: string,
    @Query('parent_task_id') parent_task_id?: string,
    @Query('sprint_id') sprint_id?: string,
    @Query('sprint_history') sprint_history?: string,
    @Query('sortAsc') sortAsc?: boolean,
  ): Promise<Task[]> {
    // TODO add search params

    return this.tasksService.findAll(
      +team_id,
      +type,
      status_name,
      +parent_task_id,
      +sprint_id,
      +sprint_history,
      sortAsc ? 'ASC' : 'DESC',
    );
  }

  @Get(':id')
  @ApiOkResponse({ type: Task })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Get('/bySlug/:slug')
  @ApiOkResponse({ type: Task })
  findBySlug(@Param('slug') slug: string) {
    return this.tasksService.findBy({
      where: { slug },
    });
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
