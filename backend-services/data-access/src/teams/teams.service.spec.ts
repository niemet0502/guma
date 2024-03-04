import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomLogger } from '../logger/custom-logger.service';
import { ProjectsService } from '../organizations/organizations.service';
import { StatusService } from '../status/status.service';
import { WorkflowService } from '../workflow/workflow.service';
import { Team } from './entities/team.entity';
import { TeamsService } from './teams.service';

describe('TeamsService', () => {
  let service: TeamsService;

  const mockRepository = {};
  const organizationServiceMock = {};
  const workflowServiceMock = {};
  const statusServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        {
          provide: getRepositoryToken(Team),
          useValue: mockRepository,
        },
        {
          provide: ProjectsService,
          useValue: organizationServiceMock,
        },
        {
          provide: WorkflowService,
          useValue: workflowServiceMock,
        },
        {
          provide: StatusService,
          useValue: statusServiceMock,
        },
        {
          provide: CustomLogger,
          useValue: {
            setContext: jest.fn(),
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
