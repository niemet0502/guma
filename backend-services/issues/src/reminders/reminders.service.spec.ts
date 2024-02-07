import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ReminderreceiversService } from '../reminderreceivers/reminderreceivers.service';
import { TasksService } from '../tasks/tasks.service';
import { RemindersService } from './reminders.service';

describe('RemindersService', () => {
  let service: RemindersService;
  let http: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        RemindersService,
        { provide: TasksService, useValue: {} },
        { provide: ReminderreceiversService, useValue: {} },
      ],
    }).compile();

    service = module.get<RemindersService>(RemindersService);
    http = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
