import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswersService } from './answers.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { AnswerVote } from './entities/vote.entity';

@Injectable()
export class AnswerVotesService {
  constructor(
    @InjectRepository(AnswerVote) private repository: Repository<AnswerVote>,
    private readonly answerService: AnswersService,
  ) {}

  async create(createVoteDto: CreateVoteDto): Promise<AnswerVote> {
    const { answer_id } = createVoteDto;

    const answer = await this.answerService.findOne(answer_id);

    if (!answer) {
      throw new BadRequestException('Answer not found');
    }

    return await this.repository.save(createVoteDto);
  }

  async findByAllAnswer(answer_id: number): Promise<AnswerVote[]> {
    return await this.repository.find({ where: { answer_id } });
  }
}
