import { UserDecorator } from '../users/user.decorator';
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
import { User } from '../users/entities/user.entity';

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiCreatedResponse({ type: Comment })
  async create(
    @UserDecorator() user: User,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return await this.commentsService.create({
      ...createCommentDto,
      created_by: user.id,
    });
  }

  @Get()
  @ApiOkResponse({ type: Comment, isArray: true })
  async findAll(
    @Query('task_id') task_id: string,
    @Query('parent_id') parent_id: string,
  ): Promise<Comment[]> {
    return await this.commentsService.findAll(+task_id, +parent_id);
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
