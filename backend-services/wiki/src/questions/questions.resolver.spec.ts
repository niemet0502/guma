import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsResolver } from './questions.resolver';
import { QuestionsService } from './questions.service';

describe('QuestionsResolver', () => {
  let resolver: QuestionsResolver;

  const questionServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsResolver,
        { provide: QuestionsService, useValue: questionServiceMock },
      ],
    }).compile();

    resolver = module.get<QuestionsResolver>(QuestionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
