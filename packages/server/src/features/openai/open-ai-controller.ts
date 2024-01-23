import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';

import { LoggingInterceptor } from '../../common/interceptos/logging-interceptor';

import { OpenAiService } from './open-ai-service';

@Controller('openai')
@UseInterceptors(LoggingInterceptor)
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Get('sample')
  sample(@Query('word') word: string): Promise<object> {
    return this.openAiService.sample(word);
  }
}
