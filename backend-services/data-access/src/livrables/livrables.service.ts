import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamsService } from '../teams/teams.service';
import { CreateLivrableDto } from './dto/create-livrable.dto';
import { UpdateLivrableDto } from './dto/update-livrable.dto';
import { Livrable } from './entities/livrable.entity';

@Injectable()
export class LivrablesService {
  constructor(
    @InjectRepository(Livrable)
    private repository: Repository<Livrable>,
    private readonly teamService: TeamsService,
  ) {}

  async create(createLivrableDto: CreateLivrableDto): Promise<Livrable> {
    const { team_id, start_at, end_at } = createLivrableDto;

    if (team_id) {
      const team = await this.teamService.findOne(team_id);

      if (!team) {
        throw new NotFoundException('Team not found');
      }
    }

    const date_start_at = new Date(start_at);
    const date_end_at = new Date(end_at);

    if (date_end_at <= date_start_at) {
      const errors = {
        message: "The end date can't be greater or equal than the start date",
      };
      throw new BadRequestException(errors);
    }

    return await this.repository.save({
      ...createLivrableDto,
      end_at: date_end_at.toString(),
      start_at: date_start_at.toString(),
    });
  }

  async findAll(team_id: number): Promise<Livrable[]> {
    return await this.repository.find({
      where: { team_id },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateLivrableDto: UpdateLivrableDto) {
    const toUpdate = await this.repository.findOne({
      where: { id },
    });

    const updated = Object.assign(toUpdate, updateLivrableDto);

    return await this.repository.save(updated);
  }

  async remove(id: number) {
    const livrable = await this.repository.findOne({ where: { id } });

    if (!livrable) {
      throw new NotFoundException('task not found');
    }

    return await this.repository.remove(livrable);
  }
}
