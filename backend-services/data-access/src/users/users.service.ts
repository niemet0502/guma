import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { CustomLogger } from 'src/logger/custom-logger.service';
import { Repository } from 'typeorm';
import { LoginDto } from '../auth/dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private logger: CustomLogger,
  ) {
    this.logger.setContext('UsersService');
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const user = await this.userRepo.findOne({ where: { email } });

    if (user) {
      this.logger.error('The email is already in use', 'cretae');
      throw new BadRequestException({ message: 'The email is already in use' });
    }

    createUserDto.password = await bcrypt.hash(password, 10);
    const username = email.split('@')[0];

    return await this.userRepo.save({ ...createUserDto, username });
  }

  async findAllByTeam(project_id: number): Promise<User[]> {
    return await this.userRepo.find({ where: { project_id } });
  }

  async findOne(id: number): Promise<User> {
    try {
      this.logger.log(`Fetching user by ID: ${id}`, 'findOne');
      const user = await this.userRepo.findOne({ where: { id } });

      if (!user) {
        this.logger.warn(`User with ID ${id} not found`, 'findOne');
      }

      return user;
    } catch (e) {
      this.logger.error(
        {
          message: `Error fetching user by ID: ${id}`,
          data: e.stack,
        },
        'findOne',
      );
      throw e;
    }
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
