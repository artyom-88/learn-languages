import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { OpenAiModule } from '../features/openai/open-ai-module';
import { WordsModule } from '../features/words/words-module';

import { AppController } from './app-controller';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'client', 'dist'),
      exclude: ['/api/(.*)'],
    }),
    OpenAiModule,
    WordsModule,
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}
