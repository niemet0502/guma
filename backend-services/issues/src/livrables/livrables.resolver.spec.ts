import { Test, TestingModule } from '@nestjs/testing';
import { LivrablesResolver } from './livrables.resolver';
import { LivrablesService } from './livrables.service';

describe('LivrablesResolver', () => {
  let resolver: LivrablesResolver;

  const livrableServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LivrablesResolver,
        { provide: LivrablesService, useValue: livrableServiceMock },
      ],
    }).compile();

    resolver = module.get<LivrablesResolver>(LivrablesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
