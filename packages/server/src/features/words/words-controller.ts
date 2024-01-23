import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { LoggingInterceptor } from '../../common/interceptos/logging-interceptor';

import { CreateWordDto, UpdateWordDto } from './words-models';
import type { Word } from './words-schema';
import { WordsService } from './words-service';

@Controller('words')
@UseInterceptors(LoggingInterceptor)
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  findAll(): Promise<Word[]> {
    return this.wordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Word> {
    return this.wordsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateWordDto): Promise<Word> {
    return this.wordsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWordDto): Promise<Word> {
    return this.wordsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Word> {
    return this.wordsService.delete(id);
  }
}
