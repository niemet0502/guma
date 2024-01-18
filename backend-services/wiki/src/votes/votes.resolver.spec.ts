import { Test, TestingModule } from '@nestjs/testing';
import { VotesResolver } from './votes.resolver';
import { VotesService } from './votes.service';

describe('VotesResolver', () => {
  let resolver: VotesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotesResolver, VotesService],
    }).compile();

    resolver = module.get<VotesResolver>(VotesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
