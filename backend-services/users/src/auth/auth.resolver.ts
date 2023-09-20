import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/create-auth.input';
import { Auth } from './entities/auth.entity';
import { Logout } from './entities/logout.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth, { name: 'userAccountAuth' })
  userAccountAuth(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    return this.authService.create(createAuthInput);
  }

  @Mutation(() => Logout, { name: 'logoutSession' })
  logoutSession() {
    return this.authService.logoutSession();
  }

  // @Mutation(() => Auth, { name: 'logoutAllSessions' })
}
