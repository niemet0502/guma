import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateVoteDto } from './dto/create-vote.dto';
import { AnswerVote } from './entities/vote.entity';
import { AnswerVotesService } from './votes.services';

@Controller('answervotes')
@ApiTags('answervotes')
export class AnswerVotesController {
  constructor(private readonly service: AnswerVotesService) {}

  @Post()
  @ApiCreatedResponse({ type: AnswerVote })
  async create(@Body() createVoteDto: CreateVoteDto): Promise<AnswerVote> {
    return await this.service.create(createVoteDto);
  }

  @Get()
  @ApiOkResponse({ type: AnswerVote })
  async findAllByAnswer(
    @Query('answer_id') answer_id: string,
  ): Promise<AnswerVote[]> {
    return await this.service.findByAllAnswer(+answer_id);
  }

  @Get(':id')
  @ApiOkResponse({ type: AnswerVote })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }
}
