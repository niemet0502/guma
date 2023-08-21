import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    const { name } = createOrganizationDto;

    const orga = await this.organizationRepository.findOne({ where: { name } });

    if (orga) {
      const errors = { message: 'The name is already in use' };
      throw new HttpException({ errors }, 404);
    }

    return await this.organizationRepository.save(createOrganizationDto);
  }

  async findAll(): Promise<Organization[]> {
    return await this.organizationRepository.find();
  }

  async findOne(id: number): Promise<Organization> {
    return await this.organizationRepository.findOne({ where: { id } });
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    const toUpdate = await this.organizationRepository.findOne({
      where: { id },
    });

    const updated = Object.assign(toUpdate, updateOrganizationDto);

    return await this.organizationRepository.save(updated);
  }

  async remove(id: number): Promise<Organization> {
    const orga = await this.organizationRepository.findOne({ where: { id } });

    if (!orga) {
      const errors = { message: 'Organization not found' };
      throw new HttpException({ errors }, 404);
    }

    return await this.organizationRepository.remove(orga);
  }
}
