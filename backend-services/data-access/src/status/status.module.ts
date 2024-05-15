import {
  MiddlewareConsumer,
  Module,
  NestModule,
  forwardRef,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { TeamsModule } from '../teams/teams.module';
import { UsersModule } from '../users/users.module';
import { TaskStatus } from './entities/status.entity';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskStatus]),
    forwardRef(() => TeamsModule),
    UsersModule,
  ],
  controllers: [StatusController],
  providers: [StatusService],
  exports: [StatusService],
})
export class StatusModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(StatusController);
  }
}
