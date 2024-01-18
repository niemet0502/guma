import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLivrableUpdateDto } from './dto/create-update.dto';
import { UpdateLivrableUpdateDto } from './dto/update-updatelivrable.dto';
import { LivrableUpdate } from './entities/update.entity';
import { LivrablesService } from './livrables.service';

@Injectable()
export class LivrableUpdatesService {
  constructor(
    @InjectRepository(LivrableUpdate)
    private repository: Repository<LivrableUpdate>,
    private readonly livrablesService: LivrablesService,
  ) {}

  async create(
    createLivrableUpdateDto: CreateLivrableUpdateDto,
  ): Promise<LivrableUpdate> {
    const { livrable_id } = createLivrableUpdateDto;

    const livrable = await this.livrablesService.findOne(livrable_id);

    if (!livrable) {
      throw new NotFoundException('Livrable not found');
    }

    return await this.repository.save({
      ...createLivrableUpdateDto,
      created_at: new Date().toString(),
    });
  }

  async findAllByLivrable(livrable_id: number): Promise<LivrableUpdate[]> {
    return await this.repository.find({
      where: { livrable_id },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateLivrableUpdateDto: UpdateLivrableUpdateDto,
  ): Promise<LivrableUpdate> {
    const toUpdate = await this.repository.findOne({
      where: { id },
    });

    const updated = Object.assign(toUpdate, updateLivrableUpdateDto);

    return await this.repository.save(updated);
  }

  async remove(id: number): Promise<LivrableUpdate> {
    const livrableUpdate = await this.repository.findOne({ where: { id } });

    if (!livrableUpdate) {
      throw new NotFoundException('task not found');
    }

    return await this.repository.remove(livrableUpdate);
  }
}
