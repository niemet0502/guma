import { HttpModule } from '@nestjs/axios';
import { Module, forwardRef } from '@nestjs/common';
import { LivrablesModule } from '../livrables/livrables.module';
import { LivrableupdatesResolver } from './livrableupdates.resolver';
import { LivrableupdatesService } from './livrableupdates.service';

@Module({
  imports: [HttpModule, forwardRef(() => LivrablesModule)],
  providers: [LivrableupdatesResolver, LivrableupdatesService],
  exports: [LivrableupdatesService],
})
export class LivrableupdatesModule {}
