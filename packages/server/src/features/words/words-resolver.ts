import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { CreateWordDto, UpdateWordDto } from './words-models';
import { Word } from './words-schema';
import { WordsService } from './words-service';

const pubSub = new PubSub();

// TODO: tune ESLint for GraphQL usage
/* eslint-disable @typescript-eslint/no-unused-vars */
@Resolver((of: unknown) => Word)
export class WordsResolver {
  constructor(private readonly wordsService: WordsService) {}

  @Query((returns) => Word)
  async word(@Args('id') id: string): Promise<Word> {
    const recipe = await this.wordsService.findOne(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Query((returns) => [Word])
  words(): Promise<Word[]> {
    return this.wordsService.findAll();
  }

  @Mutation((returns) => Word)
  async createWord(@Args('dto') dto: CreateWordDto): Promise<Word> {
    const word = await this.wordsService.create(dto);
    void pubSub.publish('wordCreated', { word: word });
    return word;
  }

  @Mutation((returns) => Word)
  async updateWord(@Args('id') id: string, @Args('dto') dto: UpdateWordDto): Promise<Word> {
    const word = await this.wordsService.update(id, dto);
    void pubSub.publish('wordCreated', { word: word });
    return word;
  }

  @Mutation((returns) => Word)
  removeWord(@Args('id') id: string): Promise<Word> {
    return this.wordsService.delete(id);
  }

  @Subscription((returns) => Word)
  wordCreated() {
    return pubSub.asyncIterator('wordCreated');
  }
}
