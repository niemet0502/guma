import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { VotesService } from './votes.service';

describe('VotesService', () => {
  let service: VotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [VotesService],
    }).compile();

    service = module.get<VotesService>(VotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
