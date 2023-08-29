import { Test, TestingModule } from '@nestjs/testing';
import { LabelsResolver } from './labels.resolver';
import { LabelsService } from './labels.service';

describe('LabelsResolver', () => {
  let resolver: LabelsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LabelsResolver, LabelsService],
    }).compile();

    resolver = module.get<LabelsResolver>(LabelsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
