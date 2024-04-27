import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomLogger } from '../logger/custom-logger.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Label } from './entities/label.entity';
import { ProjectsService } from './organizations.service';

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(Label) private repo: Repository<Label>,
    private readonly organizationService: ProjectsService,
    private logger: CustomLogger,
  ) {
    this.logger.setContext('LabelService');
  }

  async create(createLabelDto: CreateLabelDto): Promise<Label> {
    this.logger.log(
      { message: 'Creating label', data: createLabelDto },
      'create',
    );
    const { name, project_id, team_id } = createLabelDto;

    if (project_id) {
      const orga = await this.organizationService.findOne(project_id);

      if (!orga) {
        throw new NotFoundException('Organization not found');
      }
    }

    const label = await this.repo.findOne({
      where: { name: name, project_id: project_id, team_id: team_id },
    });

    if (label) {
      const errors = { message: 'The name is already in use' };
      throw new HttpException({ errors }, 404);
    }

    try {
      return await this.repo.save(createLabelDto);
    } catch (e: any) {
      this.logger.error(
        {
          message: `Error creating project`,
          data: e.stack,
        },
        'create',
      );
      throw e;
    }
  }

  async findAll(projectId?: number, teamId?: number): Promise<Label[]> {
    if (projectId) {
      // If project_id is defined, fetch labels with project_id and team_id undefined
      // Also fetch labels with the given team_id
      return this.repo.find({
        where: [
          { project_id: projectId, team_id: null },
          { project_id: null, team_id: teamId },
        ],
        order: { id: 'DESC' },
      });
    } else {
      // If project_id is not defined, fetch labels with the given team_id
      return this.repo.find({
        where: { team_id: teamId },
        order: { id: 'DESC' },
      });
    }
  }

  async findOne(id: number): Promise<Label> {
    return await this.repo.findOne({ where: { id } });
  }

  async update(id: number, updateOrganizationDto: UpdateLabelDto) {
    const toUpdate = await this.repo.findOne({
      where: { id },
    });

    const updated = Object.assign(toUpdate, updateOrganizationDto);

    return await this.repo.save(updated);
  }

  async remove(id: number): Promise<Label> {
    const orga = await this.repo.findOne({ where: { id } });

    if (!orga) {
      throw new NotFoundException('label not found');
    }

    return await this.repo.remove(orga);
  }
}
