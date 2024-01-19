import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AnswersService } from '../answers/answers.service';
import { QuestionsService } from './questions.service';

describe('QuestionsService', () => {
  let service: QuestionsService;

  const answerServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        QuestionsService,
        { provide: AnswersService, useValue: answerServiceMock },
      ],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
