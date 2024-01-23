import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { WordsController } from './words-controller';
import { WordsResolver } from './words-resolver';
import { Word, WordSchema } from './words-schema';
import { WordsService } from './words-service';

@Module({
  controllers: [WordsController],
  imports: [ConfigModule, MongooseModule.forFeature([{ name: Word.name, schema: WordSchema }])],
  providers: [WordsResolver, WordsService],
})
export class WordsModule {}
