import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrganizationsService } from '../organizations/organizations.service';
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
          provide: OrganizationsService,
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
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
