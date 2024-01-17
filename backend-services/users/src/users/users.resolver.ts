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
import { Profile } from '../profiles/entities/profile.entity';
import { Member } from '../shared/member.entity';
import { Project } from '../shared/project.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll(@Args('project_id', { type: () => Int }) project_id: number) {
    return this.usersService.findAllByTeam(project_id);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @ResolveField(() => Profile)
  async profile(@Parent() user: User): Promise<Profile> {
    const userProfile = await this.usersService.getUserProfile(user);
    return userProfile;
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<User> {
    return this.usersService.findOne(reference.id);
  }

  @ResolveField((of) => [Member])
  members(@Parent() user: User): any {
    return { __typename: 'Member', id: user.id };
  }

  @ResolveField((of) => Project)
  project(@Parent() user: User): any {
    if (!user.project_id) return null;
    return { __typename: 'Project', id: user.project_id };
  }
}
