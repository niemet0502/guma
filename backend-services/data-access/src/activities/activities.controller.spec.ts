import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';

describe('ActivitiesController', () => {
  let controller: ActivitiesController;

  const activitiesServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivitiesController],
      providers: [
        ActivitiesService,
        {
          provide: ActivitiesService,
          useValue: activitiesServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ActivitiesController>(ActivitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
