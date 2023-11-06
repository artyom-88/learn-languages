import type { IWord } from '@learn-languages/common';
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { httpClient } from 'common/http-client';
import { WORD_LIST_QUERY_KEY } from 'features/words/words-constants';

export const useWordsQuery = (
  { refetchOnMount = false, enabled = false, ...restProps }: Omit<UseQueryOptions<IWord[]>, 'queryKey' | 'queryFn'> = {
    enabled: false,
    refetchOnMount: false,
  },
): UseQueryResult<IWord[]> =>
  useQuery<IWord[]>({
    ...restProps,
    enabled: enabled,
    queryFn: () => httpClient.get('words').json(),
    queryKey: WORD_LIST_QUERY_KEY,
    refetchOnMount: refetchOnMount,
  });
