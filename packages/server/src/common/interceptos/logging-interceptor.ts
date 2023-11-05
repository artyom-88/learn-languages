import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const now = Date.now();
    const msg = context.getArgByIndex<IncomingMessage>(0);
    return next.handle().pipe(tap(() => console.log(msg.method, msg.url, `took ${Date.now() - now}ms`)));
  }
}
