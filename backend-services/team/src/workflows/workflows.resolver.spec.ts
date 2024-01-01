import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowsResolver } from './workflows.resolver';
import { WorkflowsService } from './workflows.service';

describe('WorkflowsResolver', () => {
  let resolver: WorkflowsResolver;

  const workflowServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkflowsResolver, WorkflowsService],
    })
      .overrideProvider(WorkflowsService)
      .useValue(workflowServiceMock)
      .compile();

    resolver = module.get<WorkflowsResolver>(WorkflowsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
