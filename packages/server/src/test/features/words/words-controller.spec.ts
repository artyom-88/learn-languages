import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { WordsController } from '../../../features/words/words-controller';
import { WordsService } from '../../../features/words/words-service';

import { createWord1Dto, mockWord1, mockWordList } from './words-mocks';

describe('WordsController', () => {
  let controller: WordsController;
  let service: WordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordsController],
      providers: [
        {
          provide: WordsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockWordList),
            create: jest.fn().mockResolvedValue(createWord1Dto),
          },
        },
      ],
    }).compile();

    controller = module.get<WordsController>(WordsController);
    service = module.get<WordsService>(WordsService);
  });

  describe('create()', () => {
    it('should create a new word', async () => {
      const createSpy = jest.spyOn(service, 'create').mockResolvedValueOnce(mockWord1);
      const response = await controller.create(createWord1Dto);
      expect(createSpy).toHaveBeenCalledWith(createWord1Dto);
      expect(response).toEqual(mockWord1);
    });
  });

  describe('findAll()', () => {
    it('should return an array of cats', async () => {
      const response = await controller.findAll();
      expect(response).toEqual(mockWordList);
    });
  });
});
