import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { WordsController } from './words-controller';
import { WordsService } from './words-service';

@Module({
  controllers: [WordsController],
  imports: [ConfigModule],
  providers: [WordsService],
})
export class WordsModule {}
