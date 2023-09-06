import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './entities/member.entity';
import { TeamsService } from './teams.service';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    private readonly teamService: TeamsService,
    private readonly userService: UsersService,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const { team_id, user_id } = createMemberDto;

    const team = await this.teamService.findOne(team_id);

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    const user = await this.userService.findOne(user_id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.memberRepository.save({
      ...createMemberDto,
      created_at: new Date().toLocaleString(),
    });
  }

  async findAllByTeam(team_id: number, user_id: number): Promise<Member[]> {
    const query = this.memberRepository.createQueryBuilder('member');

    if (team_id) {
      query.andWhere('member.team_id = :team_id', { team_id });
    }

    if (user_id) {
      query.andWhere('member.user_id = :user_id', { user_id });
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<Member> {
    return await this.memberRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<Member> {
    const member = await this.memberRepository.findOne({ where: { id } });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    return await this.memberRepository.remove(member);
  }
}
