import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { OpenAiController } from './open-ai-controller';
import { OpenAiService } from './open-ai-service';

@Module({
  controllers: [OpenAiController],
  imports: [ConfigModule],
  providers: [OpenAiService],
})
export class OpenAiModule {}
