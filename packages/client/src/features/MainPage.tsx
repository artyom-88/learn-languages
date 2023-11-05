import type { JSX } from 'react';

import type { IWord } from '@learn-languages/common/words-types';
import { useQuery } from '@tanstack/react-query';

import PageLayout from 'common/components/PageLayout';
import { httpClient } from 'common/http-client';

const MainPage = (): JSX.Element => {
  const { data = [] } = useQuery<IWord[]>({
    queryKey: ['word-list-query-key'],
    queryFn: () => httpClient.get('words').json(),
  });

  return (
    <PageLayout>
      {data.map(({ name }) => (
        <span key={name}>{name}</span>
      ))}
    </PageLayout>
  );
};

export default MainPage;
