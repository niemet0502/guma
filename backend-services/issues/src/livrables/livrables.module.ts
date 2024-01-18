import { HttpModule } from '@nestjs/axios';
import { Module, forwardRef } from '@nestjs/common';
import { LivrableupdatesModule } from '../livrableupdates/livrableupdates.module';
import { LivrablesResolver } from './livrables.resolver';
import { LivrablesService } from './livrables.service';

@Module({
  imports: [HttpModule, forwardRef(() => LivrableupdatesModule)],
  providers: [LivrablesResolver, LivrablesService],
  exports: [LivrablesService],
})
export class LivrablesModule {}
