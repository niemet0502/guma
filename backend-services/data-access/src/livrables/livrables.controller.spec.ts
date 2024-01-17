import { Test, TestingModule } from '@nestjs/testing';
import { LivrablesController } from './livrables.controller';
import { LivrablesService } from './livrables.service';

describe('LivrablesController', () => {
  let controller: LivrablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivrablesController],
      providers: [LivrablesService],
    }).compile();

    controller = module.get<LivrablesController>(LivrablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
