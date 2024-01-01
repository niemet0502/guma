import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../tasks/tasks.service';
import { SprintsService } from './sprints.service';

describe('SprintsService', () => {
  let service: SprintsService;
  let http: HttpService;

  const taskServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [SprintsService, TasksService],
    })
      .overrideProvider(TasksService)
      .useValue(taskServiceMock)
      .compile();

    service = module.get<SprintsService>(SprintsService);
    http = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
