import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { LabelsService } from '../labels/labels.service';
import { CustomLogger } from '../logger/custom-logger.service';
import { OrganizationsService } from './organizations.service';

describe('OrganizationsService', () => {
  let service: OrganizationsService;
  let httpService: HttpService;

  const labelServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        OrganizationsService,
        LabelsService,
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
    })
      .overrideProvider(LabelsService)
      .useValue(labelServiceMock)
      .compile();

    service = module.get<OrganizationsService>(OrganizationsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
