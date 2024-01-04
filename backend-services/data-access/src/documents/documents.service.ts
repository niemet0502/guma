import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamsService } from '../teams/teams.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document) private docRepository: Repository<Document>,
    // private readonly folderService: FolderService,
    private readonly teamService: TeamsService,
  ) {}

  async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    const { team_id, folder_id } = createDocumentDto;

    if (!team_id && !folder_id) {
      const errors = { message: 'Either team_id or folder_id must be defined' };
      throw new BadRequestException(errors);
    }

    if (team_id) {
      const team = await this.teamService.findOne(team_id);

      if (!team) {
        throw new NotFoundException('Team not found');
      }
    }

    // if (folder_id) {
    //   const folder = await this.folderService.findOne(folder_id);

    //   if (!folder) {
    //     throw new NotFoundException('Folder not found');
    //   }
    // }

    return await this.docRepository.save({
      ...createDocumentDto,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
    });
  }

  async findAllByTeam(team_id: number, folder_id: number): Promise<Document[]> {
    let query = this.docRepository.createQueryBuilder('document');

    if (team_id) {
      query = query.where('document.team_id = :team_id', { team_id });
    }

    if (folder_id) {
      query = query.andWhere('document.folder_id = :folder_id', { folder_id });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<Document> {
    return await this.docRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<Document> {
    const toUpdate = await this.docRepository.findOne({
      where: { id },
    });

    const updated = Object.assign(toUpdate, updateDocumentDto);

    updated.updated_at = new Date().toLocaleString();

    return await this.docRepository.save(updated);
  }

  async remove(id: number): Promise<Document> {
    const doc = await this.docRepository.findOne({ where: { id } });

    if (!doc) {
      throw new NotFoundException('TaskStatus not found');
    }

    return await this.docRepository.remove(doc);
  }

  async removeDocuments(folder_id: number) {
    return await this.docRepository.delete({ folder_id });
  }
}
