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
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { Workflow } from './entities/workflow.entity';
import { WorkflowService } from './workflow.service';

@Controller('workflow')
@ApiTags('workflow')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post()
  @ApiCreatedResponse({ type: Workflow })
  create(@Body() createWorkflowDto: CreateWorkflowDto) {
    return this.workflowService.create(createWorkflowDto);
  }

  @Get()
  @ApiOkResponse({ type: Workflow, isArray: true })
  findAll(@Query('team_id') team_id: string) {
    return this.workflowService.findAllByTeam(+team_id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Workflow })
  update(
    @Param('id') id: string,
    @Body() updateWorkflowDto: UpdateWorkflowDto,
  ) {
    return this.workflowService.update(+id, updateWorkflowDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Workflow })
  remove(@Param('id') id: string) {
    return this.workflowService.remove(+id);
  }
}
