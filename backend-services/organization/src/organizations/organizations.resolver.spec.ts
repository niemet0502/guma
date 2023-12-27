import { Test, TestingModule } from '@nestjs/testing';
import { LabelsService } from '../labels/labels.service';
import { OrganizationsResolver } from './organizations.resolver';
import { OrganizationsService } from './organizations.service';

describe('OrganizationsResolver', () => {
  let resolver: OrganizationsResolver;

  const organizationServiceMock = {};
  const labelsServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationsResolver, OrganizationsService, LabelsService],
    })
      .overrideProvider(OrganizationsService)
      .useValue(organizationServiceMock)
      .overrideProvider(LabelsService)
      .useValue(labelsServiceMock)
      .compile();

    resolver = module.get<OrganizationsResolver>(OrganizationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
