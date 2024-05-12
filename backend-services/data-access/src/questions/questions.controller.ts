import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { UserDecorator } from '../users/user.decorator';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { QuestionsService } from './questions.service';

@Controller('questions')
@ApiTags('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @ApiCreatedResponse({ type: Question })
  create(
    @UserDecorator() user: User,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.questionsService.create({
      ...createQuestionDto,
      created_by: user.id,
    });
  }

  @Get()
  @ApiOkResponse({ type: Question, isArray: true })
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Question })
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Question })
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Question })
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
