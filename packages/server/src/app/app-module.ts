import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
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

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProd = configService.get('NODE_ENV') === 'production';
        return {
          autoSchemaFile: true, // join(process.cwd(), 'src/schema.gql'),
          installSubscriptionHandlers: true,
          playground: false,
          plugins: isProd ? [] : [ApolloServerPluginLandingPageLocalDefault()],
          sortSchema: true,
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
