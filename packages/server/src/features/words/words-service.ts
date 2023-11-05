import { Injectable } from '@nestjs/common';

@Injectable()
export class WordsService {
  getAll(): Promise<object[]> {
    return Promise.resolve([]);
  }
}
