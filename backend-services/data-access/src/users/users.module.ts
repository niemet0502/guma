import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { ProfileController } from './profiles.controller';
import { ProfileService } from './profiles.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    LoggerModule,
    UsersModule,
  ],
  controllers: [UsersController, ProfileController],
  providers: [UsersService, ProfileService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: 'users',
        method: RequestMethod.POST,
      })
      .forRoutes(UsersController, ProfileController);
  }
}
