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
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { Folder } from './entities/folder.entity';
import { FolderService } from './folders.service';

@Controller('folders')
@ApiTags('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}
  @Post()
  @ApiCreatedResponse({ type: Folder })
  create(
    @UserDecorator() user: User,
    @Body() createFolderDto: CreateFolderDto,
  ): Promise<Folder> {
    return this.folderService.create({
      ...createFolderDto,
      create_by: user.id,
    });
  }

  @Get()
  @ApiOkResponse({ type: Folder, isArray: true })
  async findOne(@Query('team_id') team_id: string): Promise<Folder[]> {
    return await this.folderService.findAll(+team_id);
  }

  @Get(':id')
  @ApiOkResponse({ type: Folder })
  async findAll(@Param('id') id: string): Promise<Folder> {
    return await this.folderService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Folder })
  update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto) {
    return this.folderService.update(+id, updateFolderDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Folder })
  remove(@Param('id') id: string) {
    return this.folderService.remove(+id);
  }
}
