import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TeamsService } from '../teams/teams.service';
import { TaskStatus } from './entities/status.entity';
import { StatusService } from './status.service';

describe('StatusService', () => {
  let service: StatusService;

  const mockRepository = {};
  const teamsServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatusService,
        {
          provide: getRepositoryToken(TaskStatus),
          useValue: mockRepository,
        },
        {
          provide: TeamsService,
          useValue: teamsServiceMock,
        },
      ],
    }).compile();

    service = module.get<StatusService>(StatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
