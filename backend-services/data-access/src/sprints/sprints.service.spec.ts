import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StatusService } from '../status/status.service';
import { TasksService } from '../tasks/tasks.service';
import { TeamsService } from '../teams/teams.service';
import { Sprint } from './entities/sprint.entity';
import { SprintsService } from './sprints.service';

describe('SprintsService', () => {
  let service: SprintsService;

  const mockRepository = {};
  const teamServiceMock = {};
  const taskServiceMock = {};
  const statusServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SprintsService,
        {
          provide: getRepositoryToken(Sprint),
          useValue: mockRepository,
        },
        {
          provide: TeamsService,
          useValue: teamServiceMock,
        },
        {
          provide: TasksService,
          useValue: taskServiceMock,
        },
        {
          provide: StatusService,
          useValue: statusServiceMock,
        },
      ],
    }).compile();

    service = module.get<SprintsService>(SprintsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
