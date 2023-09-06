import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './entities/member.entity';
import { MembersService } from './members.service';

@Controller('members')
@ApiTags('members')
export class MembersController {
  constructor(private readonly memberService: MembersService) {}

  @Post()
  @ApiCreatedResponse({ type: Member })
  create(@Body() createMemberDto: CreateMemberDto): Promise<Member> {
    return this.memberService.create(createMemberDto);
  }

  @Get()
  @ApiOkResponse({ type: Member, isArray: true })
  async findAll(
    @Query('team_id') team_id: string,
    @Query('user_id') user_id: string,
  ): Promise<Member[]> {
    return await this.memberService.findAllByTeam(+team_id, +user_id);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Member })
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id);
  }
}
