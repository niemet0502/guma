import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrganizationsService } from './organizations.service';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';

@Resolver(() => Organization)
export class OrganizationsResolver {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Mutation(() => Organization)
  createOrganization(@Args('createOrganizationInput') createOrganizationInput: CreateOrganizationInput) {
    return this.organizationsService.create(createOrganizationInput);
  }

  @Query(() => [Organization], { name: 'organizations' })
  findAll() {
    return this.organizationsService.findAll();
  }

  @Query(() => Organization, { name: 'organization' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.organizationsService.findOne(id);
  }

  @Mutation(() => Organization)
  updateOrganization(@Args('updateOrganizationInput') updateOrganizationInput: UpdateOrganizationInput) {
    return this.organizationsService.update(updateOrganizationInput.id, updateOrganizationInput);
  }

  @Mutation(() => Organization)
  removeOrganization(@Args('id', { type: () => Int }) id: number) {
    return this.organizationsService.remove(id);
  }
}
