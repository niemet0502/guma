import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LabelsModule } from 'src/labels/labels.module';
import { OrganizationsResolver } from './organizations.resolver';
import { OrganizationsService } from './organizations.service';
@Module({
  imports: [HttpModule, LabelsModule],
  providers: [OrganizationsResolver, OrganizationsService],
})
export class OrganizationsModule {}
