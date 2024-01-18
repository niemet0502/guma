import { Test, TestingModule } from '@nestjs/testing';
import { LivrableupdatesService } from './livrableupdates.service';

describe('LivrableupdatesService', () => {
  let service: LivrableupdatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivrableupdatesService],
    }).compile();

    service = module.get<LivrableupdatesService>(LivrableupdatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
