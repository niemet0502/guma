import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomLogger } from '../modules/logger/custom-logger.service';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body, headers } = req;
    this.logger.log({
      message: `Incoming request: ${method} ${originalUrl}`,
      data: { query, body, headers, method, url: originalUrl },
    });

    next();
  }
}
