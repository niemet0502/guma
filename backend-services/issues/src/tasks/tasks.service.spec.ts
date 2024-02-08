import { HttpModule, HttpService } from '@nestjs/axios';
import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesModule } from '../activities/activities.module';
import { CommentsModule } from '../comments/comments.module';
import { TaskLabelsModule } from '../labels/labels.module';
import { LivrablesService } from '../livrables/livrables.service';
import { RemindersService } from '../reminders/reminders.service';
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
      providers: [
        TasksService,
        { provide: LivrablesService, useValue: {} },
        { provide: RemindersService, useValue: {} },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    http = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
