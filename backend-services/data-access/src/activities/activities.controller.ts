import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateActivityDto } from '../tasks/dto/create-activity.dto';
import { User } from '../users/entities/user.entity';
import { UserDecorator } from '../users/user.decorator';
import { ActivitiesService } from './activities.service';
import { Activity } from './entities/activity.entity';

@Controller('activities')
@ApiTags('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @ApiCreatedResponse({ type: Activity })
  async create(
    @UserDecorator() user: User,
    @Body() createActivityDto: CreateActivityDto,
  ): Promise<Activity> {
    return await this.activitiesService.create({
      ...createActivityDto,
      created_by: user.id,
    });
  }
  @Get()
  @ApiOkResponse({ type: Activity, isArray: true })
  async findAll(
    @Query('task_id', ParseIntPipe) task_id: number,
  ): Promise<Activity[]> {
    return await this.activitiesService.findAllByTask(task_id);
  }
}
