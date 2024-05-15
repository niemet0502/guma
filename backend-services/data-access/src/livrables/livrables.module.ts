import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { TeamsModule } from '../teams/teams.module';
import { UsersModule } from '../users/users.module';
import { Livrable } from './entities/livrable.entity';
import { LivrableUpdate } from './entities/update.entity';
import { LivrablesController } from './livrables.controller';
import { LivrablesService } from './livrables.service';
import { LivrableUpdatesController } from './updates.controller';
import { LivrableUpdatesService } from './updates.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Livrable, LivrableUpdate]),
    TeamsModule,
    UsersModule,
  ],
  controllers: [LivrablesController, LivrableUpdatesController],
  providers: [LivrablesService, LivrableUpdatesService],
})
export class LivrablesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(LivrableUpdatesController, LivrablesController);
  }
}
