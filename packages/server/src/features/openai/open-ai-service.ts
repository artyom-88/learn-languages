import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private readonly openAiClient: OpenAI;

  constructor(private configService: ConfigService) {
    const openAiKey = this.configService.get('OPEN_AI_KEY');
    this.openAiClient = new OpenAI({
      apiKey: openAiKey,
    });
  }

  async sample(content: string): Promise<object> {
    const chatCompletion = await this.openAiClient.chat.completions.create({
      messages: [{ role: 'system', content: content }],
      model: 'gpt-3.5-turbo',
    });
    return chatCompletion;
  }
}
