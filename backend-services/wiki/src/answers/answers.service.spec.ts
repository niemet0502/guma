import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { VotesService } from '../votes/votes.service';
import { AnswersService } from './answers.service';

describe('AnswersService', () => {
  let service: AnswersService;

  const voteServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        AnswersService,
        { provide: VotesService, useValue: voteServiceMock },
      ],
    }).compile();

    service = module.get<AnswersService>(AnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
