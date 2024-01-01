import { HttpModule, HttpService } from '@nestjs/axios';
import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesModule } from '../activities/activities.module';
import { CommentsModule } from '../comments/comments.module';
import { TaskLabelsModule } from '../labels/labels.module';
import { SprintsModule } from '../sprints/sprints.module';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;
  let http: HttpService;

  const labelServiceMock = {};
  const commentServiceMock = {};
  const activitiesServiceMock = {};
  const sprintServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => ActivitiesModule),
        forwardRef(() => SprintsModule),
        HttpModule,
        forwardRef(() => CommentsModule),
        forwardRef(() => TaskLabelsModule),
      ],
      providers: [TasksService],
    })
      // .overrideProvider(CommentsService)
      // .useValue(commentServiceMock)
      // .overrideProvider(ActivitiesService)
      // .useValue(activitiesServiceMock)
      // .overrideProvider(SprintsService)
      // .useValue(sprintServiceMock)
      // .overrideProvider(LabelsService)
      // .useValue(labelServiceMock)
      .compile();

    service = module.get<TasksService>(TasksService);
    http = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
