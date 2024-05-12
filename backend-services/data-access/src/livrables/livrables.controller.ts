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
import { User } from '../users/entities/user.entity';
import { UserDecorator } from '../users/user.decorator';
import { CreateLivrableDto } from './dto/create-livrable.dto';
import { UpdateLivrableDto } from './dto/update-livrable.dto';
import { Livrable } from './entities/livrable.entity';
import { LivrablesService } from './livrables.service';

@Controller('livrables')
@ApiTags('livrables')
export class LivrablesController {
  constructor(private readonly livrablesService: LivrablesService) {}

  @Post()
  @ApiCreatedResponse({ type: Livrable })
  create(
    @UserDecorator() user: User,
    @Body() createLivrableDto: CreateLivrableDto,
  ) {
    return this.livrablesService.create({
      ...createLivrableDto,
      created_by: user.id,
    });
  }

  @Get()
  @ApiOkResponse({ type: Livrable, isArray: true })
  findAll(@Query('team_id') team_id: string) {
    return this.livrablesService.findAll(+team_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.livrablesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLivrableDto: UpdateLivrableDto,
  ) {
    return this.livrablesService.update(+id, updateLivrableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.livrablesService.remove(+id);
  }
}
