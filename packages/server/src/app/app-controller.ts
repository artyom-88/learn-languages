import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Redirect('api/docs', 301)
  main() {
    return '';
  }
}
