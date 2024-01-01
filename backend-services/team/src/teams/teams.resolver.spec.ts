import { Test, TestingModule } from '@nestjs/testing';
import { TeamsResolver } from './teams.resolver';
import { TeamsService } from './teams.service';

describe('TeamsResolver', () => {
  let resolver: TeamsResolver;

  const teamServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamsResolver, TeamsService],
    })
      .overrideProvider(TeamsService)
      .useValue(teamServiceMock)
      .compile();

    resolver = module.get<TeamsResolver>(TeamsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
