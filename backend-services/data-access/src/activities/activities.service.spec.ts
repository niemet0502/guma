import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SprintsService } from '../sprints/sprints.service';
import { StatusService } from '../status/status.service';
import { ActivitiesService } from './activities.service';
import { Activity } from './entities/activity.entity';

describe('ActivitiesService', () => {
  let service: ActivitiesService;

  const sprintsServiceMock = {};
  const statusServiceMock = {};
  const mockRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivitiesService,
        {
          provide: getRepositoryToken(Activity),
          useValue: mockRepository,
        },
        {
          provide: StatusService,
          useValue: statusServiceMock,
        },
        {
          provide: SprintsService,
          useValue: sprintsServiceMock,
        },
      ],
    }).compile();

    service = module.get<ActivitiesService>(ActivitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
