import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Label } from './entities/label.entity';
import { LabelService } from './label.service';

@Controller('labels')
@ApiTags('labels')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Post()
  @ApiCreatedResponse({ type: Label })
  create(@Body() createLabelDto: CreateLabelDto): Promise<Label> {
    return this.labelService.create(createLabelDto);
  }

  @Get()
  @ApiOkResponse({ type: Label, isArray: true })
  async findAll(
    @Query('project_id') project_id: string,
    @Query('team_id') team_id: string,
  ): Promise<Label[]> {
    const projectId = project_id ? +project_id : undefined;
    const teamId = team_id ? +team_id : undefined;
    return await this.labelService.findAll(projectId, teamId);
  }

  @Get(':id')
  @ApiResponse({ type: Label })
  async findOne(@Param('id') id: string) {
    return await this.labelService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Label })
  update(@Param('id') id: string, @Body() updateLabelDto: UpdateLabelDto) {
    return this.labelService.update(+id, updateLabelDto);
  }

  @Put(':id')
  @ApiOkResponse({ type: Label })
  updateLabel(@Param('id') id: string, @Body() updateLabelDto: UpdateLabelDto) {
    return this.labelService.update(+id, updateLabelDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Label })
  remove(@Param('id') id: string): Promise<Label> {
    return this.labelService.remove(+id);
  }
}
