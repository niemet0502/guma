import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateAuthInput } from './dto/create-auth.input';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  private url = 'http://data-access:3000/auth/';

  constructor(private readonly http: HttpService) {}

  async create(createAuthInput: CreateAuthInput) {
    const { data } = await firstValueFrom(
      this.http.post<Auth>(this.url + 'login', createAuthInput),
    );

    return data;
  }

  async logoutSession() {
    await firstValueFrom(this.http.post(this.url + 'logout'));
  }
}
