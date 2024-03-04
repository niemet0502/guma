import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomLogger } from '../logger/custom-logger.service';
import { ProfilesService } from '../profiles/profiles.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpService: HttpService;

  const ProfileServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        UsersService,
        ProfilesService,
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
      .overrideProvider(ProfilesService)
      .useValue(ProfileServiceMock)
      .compile();

    service = module.get<UsersService>(UsersService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
