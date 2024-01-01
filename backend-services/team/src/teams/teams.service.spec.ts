import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from '../members/members.service';
import { StatusService } from '../status/status.service';
import { TeamsService } from './teams.service';

describe('TeamsService', () => {
  let service: TeamsService;
  let httpService: HttpService;

  const memberServiceMock = {};
  const statusServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [TeamsService, MembersService, StatusService],
    })
      .overrideProvider(MembersService)
      .useValue(memberServiceMock)
      .overrideProvider(StatusService)
      .useValue(statusServiceMock)
      .compile();

    service = module.get<TeamsService>(TeamsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
