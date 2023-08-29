import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const { name } = createProfileDto;

    const profile = await this.profileRepo.findOne({ where: { name } });

    if (profile) {
      const errors = { message: 'The profile already exists' };

      throw new BadRequestException(errors);
    }

    return await this.profileRepo.save(createProfileDto);
  }

  async findOne(id: number): Promise<Profile> {
    return await this.profileRepo.findOne({ where: { id } });
  }

  async findAll(): Promise<Profile[]> {
    return await this.profileRepo.find();
  }

  async update(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const toUpdate = await this.profileRepo.findOne({
      where: { id },
    });

    const updated = Object.assign(toUpdate, updateProfileDto);

    return await this.profileRepo.save(updated);
  }

  async remove(id: number): Promise<Profile> {
    const profile = await this.profileRepo.findOne({ where: { id } });

    if (!profile) {
      throw new NotFoundException('TaskStatus not found');
    }

    return await this.profileRepo.remove(profile);
  }
}
