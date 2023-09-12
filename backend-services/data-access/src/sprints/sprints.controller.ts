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
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { Sprint } from './entities/sprint.entity';
import { SprintsService } from './sprints.service';

@Controller('sprints')
@ApiTags('sprints')
export class SprintsController {
  constructor(private readonly sprintsService: SprintsService) {}

  @Post()
  @ApiCreatedResponse({ type: Sprint })
  create(@Body() createSprintDto: CreateSprintDto): Promise<Sprint> {
    return this.sprintsService.create(createSprintDto);
  }

  @Get()
  @ApiOkResponse({ type: Sprint, isArray: true })
  findAll(@Query('team_id') team_id: string): Promise<Sprint[]> {
    return this.sprintsService.findAll(+team_id);
  }

  @Get(':id')
  @ApiOkResponse({ type: Sprint })
  findOne(@Param('id') id: string): Promise<Sprint> {
    return this.sprintsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Sprint })
  update(
    @Param('id') id: string,
    @Body() updateSprintDto: UpdateSprintDto,
  ): Promise<Sprint> {
    return this.sprintsService.update(+id, updateSprintDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Sprint })
  remove(@Param('id') id: string): Promise<Sprint> {
    return this.sprintsService.remove(+id);
  }
}
