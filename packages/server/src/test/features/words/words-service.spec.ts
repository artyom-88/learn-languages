import { getModelToken } from '@nestjs/mongoose';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { Model } from 'mongoose';

import type { Word } from '../../../features/words/words-schema';
import { WordsService } from '../../../features/words/words-service';

import { createWord1Dto, modelName, mockWord1, mockWordList } from './words-mocks';

describe('WordsService', () => {
  let service: WordsService;
  let model: Model<Word>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WordsService,
        {
          provide: getModelToken(modelName),
          useValue: {
            new: jest.fn().mockResolvedValue(mockWord1),
            constructor: jest.fn().mockResolvedValue(mockWord1),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<WordsService>(WordsService);
    model = module.get<Model<Word>>(getModelToken(modelName));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all words', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockWordList),
    } as any);
    const words = await service.findAll();
    expect(words).toEqual(mockWordList);
  });

  it('should insert a new word', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() => Promise.resolve(mockWord1 as any));
    const newWord = await service.create(createWord1Dto);
    expect(newWord).toEqual(mockWord1);
  });
});
