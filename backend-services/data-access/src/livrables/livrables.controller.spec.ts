import { Test, TestingModule } from '@nestjs/testing';
import { LivrablesController } from './livrables.controller';
import { LivrablesService } from './livrables.service';

describe('LivrablesController', () => {
  let controller: LivrablesController;

  const livrableServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivrablesController],
      providers: [{ provide: LivrablesService, useValue: livrableServiceMock }],
    }).compile();

    controller = module.get<LivrablesController>(LivrablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
