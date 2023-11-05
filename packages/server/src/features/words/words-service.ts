import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateWordDto, UpdateWordDto } from './words-models';
import { Word } from './words-schema';

@Injectable()
export class WordsService {
  constructor(@InjectModel(Word.name) private readonly wordModel: Model<Word>) {}

  findAll(): Promise<Word[]> {
    return this.wordModel.find().exec();
  }

  async findOne(id: string): Promise<Word> {
    const word = await this.wordModel.findOne({ _id: id }).exec();
    return this.returnIfExists(id, word);
  }

  create(dto: CreateWordDto): Promise<Word> {
    return this.wordModel.create(dto);
  }

  async update(id: string, dto: UpdateWordDto): Promise<Word> {
    const word = await this.wordModel.findByIdAndUpdate(id, dto).exec();
    return this.returnIfExists(id, word);
  }

  async delete(id: string): Promise<Word> {
    const word = await this.wordModel.findByIdAndRemove(id).exec();
    return this.returnIfExists(id, word);
  }

  private returnIfExists(id: string, word: Word | null): Word {
    if (!word) {
      throw new NotFoundException(`A word with id: "${id}" is not found`);
    }
    return word;
  }
}
