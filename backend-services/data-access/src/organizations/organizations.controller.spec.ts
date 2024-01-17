import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './organizations.controller';
import { ProjectsService } from './organizations.service';

describe('ProjectsController', () => {
  let controller: ProjectsController;

  const organizationServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        { provide: ProjectsService, useValue: organizationServiceMock },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
