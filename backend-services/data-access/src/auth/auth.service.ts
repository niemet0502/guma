import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserSession } from './entities/session.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserSession)
    private userSessionRepository: Repository<UserSession>,
  ) {}

  async createSession(user: User) {
    const { id } = user;
    const session = new UserSession();
    let today = new Date();

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        lastname: user.lastname,
        firstname: user.firstname,
      },
      'shhhhh',
    );

    session.user_id = id;
    session.token = token;
    session.created_at = new Date().toString();
    session.expired_at = new Date(
      today.setMonth(today.getMonth() + 2),
    ).toString();

    return await this.userSessionRepository.save(session);
  }

  async findOne(token: string) {
    return await this.userSessionRepository.findOne({
      where: { token: token },
    });
  }

  async remove(session: UserSession) {
    return await this.userSessionRepository.remove(session);
  }

  //   async removeAll(user: User) {
  //     return await this.userSessionRepository.delete({ where: { use_id: user.id} });
  //   }
}
