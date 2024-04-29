import { HttpModule } from '@nestjs/axios';
import { Module, forwardRef } from '@nestjs/common';
import { LabelsModule } from 'src/labels/labels.module';
import { LoggerModule } from '../logger/logger.module';
import { MembersModule } from '../members/members.module';
import { OrganizationsResolver } from './organizations.resolver';
import { OrganizationsService } from './organizations.service';
import { UsersResolver } from './users.resolver';
@Module({
  imports: [
    HttpModule,
    LabelsModule,
    LoggerModule,
    forwardRef(() => MembersModule),
  ],
  providers: [OrganizationsResolver, OrganizationsService, UsersResolver],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
