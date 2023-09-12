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
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';

@Controller('documents')
@ApiTags('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @ApiCreatedResponse({ type: Document })
  create(@Body() createDocumentDto: CreateDocumentDto) {
    // TODO get the user.id from the header
    return this.documentsService.create(createDocumentDto);
  }

  @Get()
  @ApiOkResponse({ type: Document, isArray: true })
  findAll(
    @Query('team_id') team_id: string,
    @Query('folder_id') folder_id: string,
  ) {
    return this.documentsService.findAllByTeam(+team_id, +folder_id);
  }

  @Get(':id')
  @ApiOkResponse({ type: Document })
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Document })
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(+id, updateDocumentDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Document })
  remove(@Param('id') id: string) {
    return this.documentsService.remove(+id);
  }
}
