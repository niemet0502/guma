import { Test, TestingModule } from '@nestjs/testing';
import { ReminderreceiversResolver } from './reminderreceivers.resolver';
import { ReminderreceiversService } from './reminderreceivers.service';

describe('ReminderreceiversResolver', () => {
  let resolver: ReminderreceiversResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReminderreceiversResolver, ReminderreceiversService],
    }).compile();

    resolver = module.get<ReminderreceiversResolver>(ReminderreceiversResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
