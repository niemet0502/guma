import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from './entities/label.entity';
import { Project } from './entities/project.entity';
import { LabelService } from './label.service';
import { LabelController } from './labels.controller';
import { ProjectsController } from './organizations.controller';
import { ProjectsService } from './organizations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Label])],
  controllers: [ProjectsController, LabelController],
  providers: [ProjectsService, LabelService],
  exports: [ProjectsService, LabelService],
})
export class OrganizationsModule {}
