import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

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

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiCreatedResponse({ type: Comment })
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    // TODO get the user id from the header
    return await this.commentsService.create(createCommentDto);
  }

  @Get()
  @ApiOkResponse({ type: Comment, isArray: true })
  async findAll(@Query('task_id') task_id: string): Promise<Comment[]> {
    return await this.commentsService.findAllByTask(+task_id);
  }

  @Get(':id')
  @ApiOkResponse({ type: Comment })
  async findOne(@Param('id') id: string): Promise<Comment> {
    return await this.commentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Comment })
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return await this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Comment })
  async remove(@Param('id') id: string): Promise<Comment> {
    return await this.commentsService.remove(+id);
  }
}
