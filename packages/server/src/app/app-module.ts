import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { OpenAiModule } from '../features/openai/open-ai-module';
import { WordsModule } from '../features/words/words-module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get('DB_URI');
        return {
          uri: uri,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
    OpenAiModule,
    WordsModule,
  ],
})
export class AppModule {}
