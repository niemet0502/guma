import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionsService } from '../questions/questions.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer) private repository: Repository<Answer>,
    private readonly questionService: QuestionsService,
  ) {}

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const { question_id } = createAnswerDto;

    const question = await this.questionService.findOne(question_id);

    if (!question) {
      throw new BadRequestException('Question not found');
    }

    return await this.repository.save({
      ...createAnswerDto,
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
    });
  }

  async findAllByQuestion(question_id): Promise<Answer[]> {
    return await this.repository.find({ where: { question_id } });
  }

  async findOne(id: number): Promise<Answer> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    const toUpdate = await this.repository.findOne({
      where: { id },
    });

    const updated = Object.assign(toUpdate, updateAnswerDto);

    return await this.repository.save({
      ...updated,
      updated_at: new Date().toString(),
    });
  }

  async remove(id: number): Promise<Answer> {
    const answer = await this.repository.findOne({ where: { id } });

    if (!answer) {
      throw new NotFoundException('Answers not found');
    }

    return await this.repository.remove(answer);
  }
}
