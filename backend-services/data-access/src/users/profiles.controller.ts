import { ProfileService } from './profiles.service';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Controller('profiles')
@ApiTags('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiCreatedResponse({ type: Profile })
  create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  @ApiOkResponse({ type: Profile, isArray: true })
  async findAll(): Promise<Profile[]> {
    return await this.profileService.findAll();
  }

  @Patch(':id')
  @ApiOkResponse({ type: Profile })
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Profile })
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
