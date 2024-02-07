import { Test, TestingModule } from '@nestjs/testing';
import { ReminderreceiversService } from './reminderreceivers.service';

describe('ReminderreceiversService', () => {
  let service: ReminderreceiversService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReminderreceiversService],
    }).compile();

    service = module.get<ReminderreceiversService>(ReminderreceiversService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
