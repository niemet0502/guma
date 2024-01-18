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
import { CreateLivrableUpdateDto } from './dto/create-update.dto';
import { UpdateLivrableUpdateDto } from './dto/update-updatelivrable.dto';
import { LivrableUpdate } from './entities/update.entity';
import { LivrableUpdatesService } from './updates.service';

@Controller('livrableupdates')
@ApiTags('livrableupdates')
export class LivrableUpdatesController {
  constructor(private readonly service: LivrableUpdatesService) {}

  @Post()
  @ApiCreatedResponse({ type: LivrableUpdate })
  create(@Body() createLivrableUpdateDto: CreateLivrableUpdateDto) {
    return this.service.create(createLivrableUpdateDto);
  }

  @Get()
  @ApiOkResponse({ type: LivrableUpdate, isArray: true })
  findAll(@Query('livrable_id') livrable_id: string) {
    return this.service.findAllByLivrable(+livrable_id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLivrableUpdateDto: UpdateLivrableUpdateDto,
  ) {
    return this.service.update(+id, updateLivrableUpdateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
