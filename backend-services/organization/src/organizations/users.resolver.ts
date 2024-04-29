import { Inject, forwardRef } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ProjectMember } from 'src/members/entities/member.entity';
import { MembersService } from '../members/members.service';
import { User } from '../shared/user.entity';

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    @Inject(forwardRef(() => MembersService))
    private readonly membersService: MembersService,
  ) {}

  @ResolveField((of) => [ProjectMember])
  public projects(@Parent() user: User): any {
    return this.membersService.findAll(undefined, user.id);
  }
}
