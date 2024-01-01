import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { SprintsService } from '../sprints/sprints.service';
import { ActivitiesService } from './activities.service';

describe('ActivitiesService', () => {
  let service: ActivitiesService;
  let http: HttpService;

  const sprintServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ActivitiesService, SprintsService],
    })
      .overrideProvider(SprintsService)
      .useValue(sprintServiceMock)
      .compile();

    service = module.get<ActivitiesService>(ActivitiesService);
    http = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
