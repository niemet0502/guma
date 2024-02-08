import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private organizationRepository: Repository<Project>,
  ) {}

  async create(CreateProjectDto: CreateProjectDto) {
    const { name } = CreateProjectDto;

    const orga = await this.organizationRepository.findOne({ where: { name } });

    if (orga) {
      const errors = { message: 'The name is already in use' };
      throw new HttpException({ errors }, 404);
    }

    return await this.organizationRepository.save(CreateProjectDto);
  }

  async findAll(): Promise<Project[]> {
    return await this.organizationRepository.find();
  }

  async findOne(id: number): Promise<Project> {
    return await this.organizationRepository.findOne({ where: { id } });
  }

  async update(id: number, UpdateProjectDto: UpdateProjectDto) {
    const toUpdate = await this.organizationRepository.findOne({
      where: { id },
    });

    const updated = Object.assign(toUpdate, UpdateProjectDto);

    return await this.organizationRepository.save(updated);
  }

  async remove(id: number): Promise<Project> {
    const orga = await this.organizationRepository.findOne({ where: { id } });

    if (!orga) {
      const errors = { message: 'Project not found' };
      throw new HttpException({ errors }, 404);
    }

    return await this.organizationRepository.remove(orga);
  }
}
