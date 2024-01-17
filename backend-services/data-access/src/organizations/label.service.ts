import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Label } from './entities/label.entity';
import { ProjectsService } from './organizations.service';

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(Label) private repo: Repository<Label>,
    private readonly organizationService: ProjectsService,
  ) {}

  async create(createLabelDto: CreateLabelDto): Promise<Label> {
    const { name, organization_id } = createLabelDto;

    const orga = await this.organizationService.findOne(+organization_id);

    if (!orga) {
      throw new NotFoundException('Organization not found');
    }

    const label = await this.repo.findOne({
      where: { name: name, organization_id: organization_id },
    });

    if (label) {
      const errors = { message: 'The name is already in use' };
      throw new HttpException({ errors }, 404);
    }

    return await this.repo.save(createLabelDto);
  }

  async findAll(organization_id: number): Promise<Label[]> {
    const orga = await this.organizationService.findOne(organization_id);

    if (!orga) {
      throw new NotFoundException('Organization not found');
    }

    return await this.repo.find({ where: { organization_id } });
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
