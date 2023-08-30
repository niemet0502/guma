import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ProfileService } from './profiles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly orgaService: OrganizationsService,
    private readonly profileService: ProfileService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { organization_id, profile_id } = createUserDto;

    const team = organization_id
      ? await this.orgaService.findOne(organization_id)
      : undefined;

    if (team && !team) {
      throw new NotFoundException('Organization not found');
    }

    const profile = await this.profileService.findOne(profile_id);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return await this.userRepo.save(createUserDto);
  }

  async findAllByTeam(organization_id: number): Promise<User[]> {
    return await this.userRepo.find({ where: { organization_id } });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepo.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const toUpdate = await this.userRepo.findOne({
      where: { id },
    });

    const updated = Object.assign(toUpdate, updateUserDto);

    return await this.userRepo.save(updated);
  }

  async remove(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.userRepo.remove(user);
  }
}
