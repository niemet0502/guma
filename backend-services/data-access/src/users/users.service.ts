import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { LoginDto } from '../auth/dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const user = await this.userRepo.findOne({ where: { email } });

    if (user) {
      throw new BadRequestException({ message: 'The email is already in use' });
    }

    createUserDto.password = await bcrypt.hash(password, 10);
    const username = email.split('@')[0];

    return await this.userRepo.save({ ...createUserDto, username });
  }

  async findAllByTeam(organization_id: number): Promise<User[]> {
    return await this.userRepo.find({ where: { organization_id } });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepo.findOne({ where: { id } });
  }

  async find({ email, password }: LoginDto): Promise<User | null> {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    if (await bcrypt.compare(password, user.password)) {
      delete user.password;
      return user;
    }

    return null;
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
