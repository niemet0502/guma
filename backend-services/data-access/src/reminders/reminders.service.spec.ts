import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reminder } from './entities/reminder.entity';
import { RemindersService } from './reminders.service';

describe('RemindersService', () => {
  let service: RemindersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemindersService,
        { provide: getRepositoryToken(Reminder), useValue: {} },
      ],
    }).compile();

    service = module.get<RemindersService>(RemindersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
