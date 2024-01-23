import { Controller, Get, Redirect, UseInterceptors } from '@nestjs/common';

import { LoggingInterceptor } from '../common/interceptos/logging-interceptor';

@Controller()
@UseInterceptors(LoggingInterceptor)
export class AppController {
  @Get('/')
  @Redirect('api/docs', 301)
  main() {
    return '';
  }
}
