import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesResolver } from './activities.resolver';
import { ActivitiesService } from './activities.service';

describe('ActivitiesResolver', () => {
  let resolver: ActivitiesResolver;

  const activitiesServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivitiesResolver, ActivitiesService],
    })
      .overrideProvider(ActivitiesService)
      .useValue(activitiesServiceMock)
      .compile();

    resolver = module.get<ActivitiesResolver>(ActivitiesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
