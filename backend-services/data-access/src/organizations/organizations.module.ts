import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from './entities/label.entity';
import { Organization } from './entities/organization.entity';
import { LabelService } from './label.service';
import { LabelController } from './labels.controller';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, Label])],
  controllers: [OrganizationsController, LabelController],
  providers: [OrganizationsService, LabelService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
