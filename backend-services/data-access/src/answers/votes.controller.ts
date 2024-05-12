import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { UserDecorator } from '../users/user.decorator';
import { CreateVoteDto } from './dto/create-vote.dto';
import { AnswerVote } from './entities/vote.entity';
import { AnswerVotesService } from './votes.services';

@Controller('answervotes')
@ApiTags('answervotes')
export class AnswerVotesController {
  constructor(private readonly service: AnswerVotesService) {}

  @Post()
  @ApiCreatedResponse({ type: AnswerVote })
  async create(
    @UserDecorator() user: User,
    @Body() createVoteDto: CreateVoteDto,
  ): Promise<AnswerVote> {
    return await this.service.create({ ...createVoteDto, created_by: user.id });
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
