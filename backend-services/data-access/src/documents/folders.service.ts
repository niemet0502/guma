import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamsService } from '../teams/teams.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { Folder } from './entities/folder.entity';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder) private folderRepository: Repository<Folder>,
    private readonly teamService: TeamsService,
  ) {}

  async create(createFolderDto: CreateFolderDto): Promise<Folder> {
    const { name, team_id } = createFolderDto;

    const team = await this.teamService.findOne(+team_id);

    if (!team) {
      throw new NotFoundException('Organization not found');
    }

    const Folder = await this.folderRepository.findOne({
      where: { name: name, team_id: team_id },
    });

    if (Folder) {
      const errors = { message: 'The name is already in use' };
      throw new HttpException({ errors }, 404);
    }

    return await this.folderRepository.save(createFolderDto);
  }

  async findAll(team_id: number): Promise<Folder[]> {
    const team = await this.teamService.findOne(team_id);

    if (!team) {
      throw new NotFoundException('Organization not found');
    }

    return await this.folderRepository.find({ where: { team_id } });
  }

  async update(id: number, updateFolderDto: UpdateFolderDto) {
    const toUpdate = await this.folderRepository.findOne({
      where: { id },
    });

    const updated = Object.assign(toUpdate, updateFolderDto);

    return await this.folderRepository.save(updated);
  }

  async remove(id: number): Promise<Folder> {
    const orga = await this.folderRepository.findOne({ where: { id } });

    if (!orga) {
      throw new NotFoundException('Folder not found');
    }

    return await this.folderRepository.remove(orga);
  }
}
