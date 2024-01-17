import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TeamsService } from '../teams/teams.service';
import { Livrable } from './entities/livrable.entity';
import { LivrablesService } from './livrables.service';

describe('LivrablesService', () => {
  let service: LivrablesService;

  const mockRepository = {};
  const teamServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LivrablesService,
        {
          provide: getRepositoryToken(Livrable),
          useValue: mockRepository,
        },
        {
          provide: TeamsService,
          useValue: teamServiceMock,
        },
      ],
    }).compile();

    service = module.get<LivrablesService>(LivrablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
