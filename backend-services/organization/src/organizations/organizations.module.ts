import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OrganizationsResolver } from './organizations.resolver';
import { OrganizationsService } from './organizations.service';
@Module({
  imports: [HttpModule],
  providers: [OrganizationsResolver, OrganizationsService],
})
export class OrganizationsModule {}
