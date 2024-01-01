import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from '../teams/teams.service';
import { MembersService } from './members.service';

describe('MembersService', () => {
  let service: MembersService;
  let httpService: HttpService;

  const teamServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [MembersService, TeamsService],
    })
      .overrideProvider(TeamsService)
      .useValue(teamServiceMock)
      .compile();

    service = module.get<MembersService>(MembersService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
