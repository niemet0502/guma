import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question) private repository: Repository<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    return await this.repository.save({
      ...createQuestionDto,
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
    });
  }

  async findAll() {
    return await this.repository.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const result = await this.repository.findOne({ where: { id } });

    await this.repository.save({ ...result, view: result.view++ });

    return result;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const toUpdate = await this.repository.findOne({
      where: { id },
    });

    const updated = Object.assign(toUpdate, updateQuestionDto);

    return await this.repository.save({
      ...updated,
      updated_at: new Date().toString(),
    });
  }

  async remove(id: number) {
    const question = await this.repository.findOne({ where: { id } });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return await this.repository.remove(question);
  }
}
