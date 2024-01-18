import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { LivrableupdatesService } from '../livrableupdates/livrableupdates.service';
import { LivrablesService } from './livrables.service';

describe('LivrablesService', () => {
  let service: LivrablesService;
  let http: HttpService;

  const livrableUpdateServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        LivrablesService,
        {
          provide: LivrableupdatesService,
          useValue: livrableUpdateServiceMock,
        },
      ],
    }).compile();

    service = module.get<LivrablesService>(LivrablesService);
    http = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
