import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { OpenAiModule } from '../features/openai/open-ai-module';

@Module({
  imports: [ConfigModule.forRoot(), OpenAiModule],
})
export class AppModule {}
