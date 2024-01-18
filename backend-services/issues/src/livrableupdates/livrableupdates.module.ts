import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LivrableupdatesResolver } from './livrableupdates.resolver';
import { LivrableupdatesService } from './livrableupdates.service';

@Module({
  imports: [HttpModule],
  providers: [LivrableupdatesResolver, LivrableupdatesService],
})
export class LivrableupdatesModule {}
