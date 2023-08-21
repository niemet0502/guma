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
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { TaskStatus } from './entities/status.entity';
import { StatusService } from './status.service';

@Controller('status')
@ApiTags('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  @ApiCreatedResponse({ type: TaskStatus })
  create(@Body() createLabelDto: CreateStatusDto): Promise<TaskStatus> {
    return this.statusService.create(createLabelDto);
  }

  @Get(':team_id')
  @ApiOkResponse({ type: TaskStatus, isArray: true })
  async findAll(@Param('team_id') team_id: string): Promise<TaskStatus[]> {
    return await this.statusService.findAll(+team_id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TaskStatus })
  update(@Param('id') id: string, @Body() updateLabelDto: UpdateStatusDto) {
    return this.statusService.update(+id, updateLabelDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TaskStatus })
  remove(@Param('id') id: string) {
    return this.statusService.remove(+id);
  }
}
