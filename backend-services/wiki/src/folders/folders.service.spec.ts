import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsService } from '../documents/documents.service';
import { FoldersService } from './folders.service';

describe('FoldersService', () => {
  let service: FoldersService;
  let httpService: HttpService;

  const documentServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [FoldersService, DocumentsService],
    })
      .overrideProvider(DocumentsService)
      .useValue(documentServiceMock)
      .compile();

    service = module.get<FoldersService>(FoldersService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
