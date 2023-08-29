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
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { TeamsService } from './teams.service';

@Controller('teams')
@ApiTags('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiCreatedResponse({ type: Team })
  create(@Body() createTeamDto: CreateTeamDto) {
    // TODO get the user_id from the auth token
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  @ApiOkResponse({ type: Team, isArray: true })
  findAll(@Query('organization_id') organization_id: string) {
    return this.teamsService.findAllByOrganization(+organization_id);
  }

  @Get(':id')
  @ApiOkResponse({ type: Team })
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Team })
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Team })
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }
}
