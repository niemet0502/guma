import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesResolver } from './profiles.resolver';
import { ProfilesService } from './profiles.service';

describe('ProfilesResolver', () => {
  let resolver: ProfilesResolver;

  const profileServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilesResolver, ProfilesService],
    })
      .overrideProvider(ProfilesService)
      .useValue(profileServiceMock)
      .compile();

    resolver = module.get<ProfilesResolver>(ProfilesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
