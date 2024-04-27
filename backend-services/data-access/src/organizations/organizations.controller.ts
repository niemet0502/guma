import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsService } from './organizations.service';

@Controller('projects')
@ApiTags('projects')
export class ProjectsController {
  constructor(private readonly ProjectsService: ProjectsService) {}

  @Post()
  @ApiCreatedResponse({ type: Project })
  create(@Body() CreateProjectDto: CreateProjectDto) {
    return this.ProjectsService.create(CreateProjectDto);
  }

  @Get()
  @ApiOkResponse({ type: Project, isArray: true })
  findAll() {
    return this.ProjectsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Project })
  findOne(@Param('id') id: string) {
    return this.ProjectsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Project })
  update(@Param('id') id: string, @Body() UpdateProjectDto: UpdateProjectDto) {
    return this.ProjectsService.update(+id, UpdateProjectDto);
  }

  @Put(':id')
  @ApiOkResponse({ type: Project })
  updateProject(
    @Param('id') id: string,
    @Body() UpdateProjectDto: UpdateProjectDto,
  ) {
    return this.ProjectsService.update(+id, UpdateProjectDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Project })
  remove(@Param('id') id: string) {
    return this.ProjectsService.remove(+id);
  }
}
