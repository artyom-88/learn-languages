import type { IWord } from '@learn-languages/common/words-types';
import { useQuery } from '@tanstack/react-query';

import { httpClient } from 'common/http-client';

export const useWordsQuery = () =>
  useQuery<IWord[]>({
    queryKey: ['word-list-query-key'],
    queryFn: () => httpClient.get('words').json(),
  });
