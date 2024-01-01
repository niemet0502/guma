import { Test, TestingModule } from '@nestjs/testing';
import { FoldersResolver } from './folders.resolver';
import { FoldersService } from './folders.service';

describe('FoldersResolver', () => {
  let resolver: FoldersResolver;

  const folderServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoldersResolver, FoldersService],
    })
      .overrideProvider(FoldersService)
      .useValue(folderServiceMock)
      .compile();

    resolver = module.get<FoldersResolver>(FoldersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
