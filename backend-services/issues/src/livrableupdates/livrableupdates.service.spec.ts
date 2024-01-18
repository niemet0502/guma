import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { LivrablesService } from '../livrables/livrables.service';
import { LivrableupdatesService } from './livrableupdates.service';

describe('LivrableupdatesService', () => {
  let service: LivrableupdatesService;
  let http: HttpService;

  const livrableServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        LivrableupdatesService,
        {
          provide: LivrablesService,
          useValue: livrableServiceMock,
        },
      ],
    }).compile();

    service = module.get<LivrableupdatesService>(LivrableupdatesService);
    http = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
