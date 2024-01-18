import { Test, TestingModule } from '@nestjs/testing';
import { LivrableupdatesResolver } from './livrableupdates.resolver';
import { LivrableupdatesService } from './livrableupdates.service';

describe('LivrableupdatesResolver', () => {
  let resolver: LivrableupdatesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivrableupdatesResolver, LivrableupdatesService],
    }).compile();

    resolver = module.get<LivrableupdatesResolver>(LivrableupdatesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
