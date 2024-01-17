import { Test, TestingModule } from '@nestjs/testing';
import { LivrablesService } from './livrables.service';

describe('LivrablesService', () => {
  let service: LivrablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivrablesService],
    }).compile();

    service = module.get<LivrablesService>(LivrablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
