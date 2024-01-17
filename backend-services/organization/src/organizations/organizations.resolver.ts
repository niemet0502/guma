import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { LabelsService } from '../labels/labels.service';
import { User } from '../shared/user.entity';
import { CurrentUser } from '../utils/current-user.decorator';
import { CreateProjectInput } from './dto/create-organization.input';
import { UpdateProjectInput } from './dto/update-organization.input';
import { Project } from './entities/project.entity';
import { OrganizationsService } from './organizations.service';

@Resolver(() => Project)
export class OrganizationsResolver {
  constructor(
    private readonly organizationsService: OrganizationsService,
    private readonly labelsService: LabelsService,
  ) {}

  @Mutation(() => Project)
  createProject(
    @Args('createProjectInput')
    createProjectInput: CreateProjectInput,
    @CurrentUser() user: User,
  ) {
    return this.organizationsService.create(createProjectInput, user);
  }

  @Query(() => [Project], { name: 'projects' })
  findAll() {
    return this.organizationsService.findAll();
  }

  @Query(() => Project, { name: 'project' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.organizationsService.findOne(id);
  }

  @Mutation(() => Project)
  updateProject(
    @Args('updateProjectInput')
    updateProjectInput: UpdateProjectInput,
  ) {
    return this.organizationsService.update(
      updateProjectInput.id,
      updateProjectInput,
    );
  }

  @Mutation(() => Project)
  removeProject(@Args('id', { type: () => Int }) id: number) {
    return this.organizationsService.remove(id);
  }

  @ResolveField()
  async labels(@Parent() organization: Project) {
    const { id } = organization;
    return this.labelsService.findAll(id);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<Project> {
    return this.organizationsService.findOne(reference.id);
  }
}
