import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LivrablesService } from './livrables.service';
import { CreateLivrableDto } from './dto/create-livrable.dto';
import { UpdateLivrableDto } from './dto/update-livrable.dto';

@Controller('livrables')
export class LivrablesController {
  constructor(private readonly livrablesService: LivrablesService) {}

  @Post()
  create(@Body() createLivrableDto: CreateLivrableDto) {
    return this.livrablesService.create(createLivrableDto);
  }

  @Get()
  findAll() {
    return this.livrablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.livrablesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLivrableDto: UpdateLivrableDto) {
    return this.livrablesService.update(+id, updateLivrableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.livrablesService.remove(+id);
  }
}
