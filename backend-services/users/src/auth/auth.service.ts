import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CustomLogger } from '../logger/custom-logger.service';
import { CreateAuthInput } from './dto/create-auth.input';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  private url = 'http://data-access:3000/auth/';

  constructor(
    private readonly http: HttpService,
    private logger: CustomLogger,
  ) {
    this.logger.setContext('AuthService');
  }

  async create(createAuthInput: CreateAuthInput) {
    this.logger.log(
      { message: `Signin user `, data: createAuthInput },
      'create',
    );

    const { data } = await firstValueFrom(
      this.http.post<Auth>(this.url + 'login', createAuthInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data, 'create');
          throw error.response.data;
        }),
      ),
    );

    return data;
  }

  async logoutSession() {
    await firstValueFrom(
      this.http.post(this.url + 'logout').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data, 'logoutSession');
          throw error.response.data;
        }),
      ),
    );
  }
}
