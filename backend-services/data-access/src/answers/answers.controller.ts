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
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';

@Controller('answers')
@ApiTags('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  @ApiCreatedResponse({ type: Answer })
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto);
  }

  @Get()
  @ApiOkResponse({ type: Answer, isArray: true })
  findAll(@Query('question_id') question_id: string) {
    return this.answersService.findAllByQuestion(+question_id);
  }

  @Get(':id')
  @ApiOkResponse({ type: Answer })
  findOne(@Param('id') id: string) {
    return this.answersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Answer })
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(+id, updateAnswerDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Answer })
  remove(@Param('id') id: string) {
    return this.answersService.remove(+id);
  }
}
