import type { IWord } from '@learn-languages/common';
import { Language } from '@learn-languages/common';

import type { CreateWordDto } from '../../../features/words/words-models';

export const modelName = 'Word';

export const createWord1Dto: CreateWordDto = {
  lang: Language.EN,
  name: 'cat',
};

export const mockWord1: IWord = {
  _id: '65495763602f4dc58e1c4905',
  lang: Language.EN,
  name: 'cat',
};

export const mockWord2: IWord = {
  _id: '654962c80e64fd2781f71714',
  lang: Language.EN,
  name: 'dog',
};

export const mockWordList: IWord[] = [mockWord1, mockWord2];
