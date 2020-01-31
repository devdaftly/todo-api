import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    // TODO: Replace with actual logger
    /* tslint:disable-next-line */
    console.log('Request...');
    next();
  }
}
