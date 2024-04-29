import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomLogger } from '../logger/custom-logger.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectMember } from './entities/projectmember.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private organizationRepository: Repository<Project>,
    @InjectRepository(ProjectMember)
    private memberRepository: Repository<ProjectMember>,
    private logger: CustomLogger,
  ) {
    this.logger.setContext('ProjectsService');
  }

  async create(CreateProjectDto: CreateProjectDto, userId: number) {
    const { name } = CreateProjectDto;

    const orga = await this.organizationRepository.findOne({ where: { name } });

    if (orga) {
      const errors = { message: 'The name is already in use' };
      throw new HttpException({ errors }, 404);
    }

    // create the project
    const project = await this.organizationRepository.save(CreateProjectDto);

    // create the project member and assign the user who has created the project as owner
    await this.memberRepository.save({
      project_id: project.id,
      user_id: userId,
      profile_id: 1,
    });

    return project;
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

  async findMembers(projectId?: number, userId?: number) {
    this.logger.log(
      { message: 'Fetching members ...', data: { projectId, userId } },
      'findMembers',
    );
    const query = this.memberRepository.createQueryBuilder('projectMember');

    if (projectId) {
      query.andWhere('projectMember.project_id = :projectId', { projectId });
    }

    if (userId) {
      query.andWhere('projectMember.user_id = :userId', { userId });
    }

    try {
      const result = await query.getMany();
      console.log(result);
      return result;
    } catch (error) {
      this.logger.debug({ message: 'Failed to fetch members', data: error });
    }
  }
}
