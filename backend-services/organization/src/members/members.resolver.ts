import { Inject, forwardRef } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { User } from 'src/shared/user.entity';
import { Project } from '../organizations/entities/project.entity';
import { CreateMemberProjectInput } from './dto/create-member.input';
import { ProjectMember } from './entities/member.entity';
import { MembersService } from './members.service';

@Resolver(() => ProjectMember)
export class MembersResolver {
  constructor(
    private readonly membersService: MembersService,
    @Inject(forwardRef(() => OrganizationsService))
    private readonly projectService: OrganizationsService,
  ) {}

  @Mutation(() => ProjectMember)
  createMemberProject(
    @Args('createMemberProjectInput')
    createMemberProjectInput: CreateMemberProjectInput,
  ) {
    return this.membersService.create(createMemberProjectInput);
  }

  @Query(() => [ProjectMember], { name: 'projectmembers' })
  findAll(
    @Args('projectId', { type: () => Int, nullable: true }) projectId?: number,
    @Args('userId', { type: () => Int, nullable: true }) userId?: number,
  ) {
    return this.membersService.findAll(projectId, userId);
  }

  @Query((Project) => ProjectMember, { name: 'projectmember' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.membersService.findOne(id);
  }

  @Mutation(() => ProjectMember)
  removeMemberProject(@Args('id', { type: () => Int }) id: number) {
    return this.membersService.remove(id);
  }

  @ResolveField(() => User)
  user(@Parent() projectMember: ProjectMember): any {
    return { __typename: 'User', id: projectMember.user_id };
  }

  @ResolveField(() => Project)
  async project(@Parent() projectMember: ProjectMember): Promise<Project> {
    return await this.projectService.findOne(projectMember.project_id);
  }
}
