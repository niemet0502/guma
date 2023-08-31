import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsResolver } from './documents.resolver';
import { DocumentsService } from './documents.service';

describe('DocumentsResolver', () => {
  let resolver: DocumentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentsResolver, DocumentsService],
    }).compile();

    resolver = module.get<DocumentsResolver>(DocumentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
