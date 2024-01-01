import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsResolver } from './documents.resolver';
import { DocumentsService } from './documents.service';

describe('DocumentsResolver', () => {
  let resolver: DocumentsResolver;

  const documentServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentsResolver, DocumentsService],
    })
      .overrideProvider(DocumentsService)
      .useValue(documentServiceMock)
      .compile();

    resolver = module.get<DocumentsResolver>(DocumentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
