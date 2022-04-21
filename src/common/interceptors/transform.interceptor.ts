import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  // eslint-disable-next-line class-methods-use-this
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<Record<string, any>> {
    return next.handle().pipe(map((data) => instanceToPlain(data)));
  }
}
