import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { ProfileController } from './profiles.controller';
import { ProfileService } from './profiles.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile]), OrganizationsModule],
  controllers: [UsersController, ProfileController],
  providers: [UsersService, ProfileService],
})
export class UsersModule {}
