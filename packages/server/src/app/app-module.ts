import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { Language } from '@learn-languages/common';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
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
        return { uri: uri };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'client', 'dist'),
      exclude: ['/api/(.*)'],
    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        registerEnumType(Language, {
          name: 'Language',
        });
        const isProd = configService.get('NODE_ENV') === 'production';
        return {
          autoSchemaFile: true, // join(process.cwd(), 'src/schema.gql'),
          playground: false,
          plugins: isProd ? [] : [ApolloServerPluginLandingPageLocalDefault()],
          sortSchema: true,
          subscriptions: {
            'graphql-ws': true,
          },
        };
      },
    }),
    OpenAiModule,
    WordsModule,
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}
