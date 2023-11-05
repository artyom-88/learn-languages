import { Controller, Get, Query } from '@nestjs/common';

import { OpenAiService } from './open-ai-service';

@Controller('openai')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Get('sample')
  findAll(@Query('word') word: string): Promise<object> {
    return this.openAiService.sample(word);
  }
}
