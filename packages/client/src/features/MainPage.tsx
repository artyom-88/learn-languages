import { useQuery } from '@tanstack/react-query';

import PageLayout from 'common/components/PageLayout';

const MainPage = (): JSX.Element => {
  const { data = '' } = useQuery<string>({
    queryKey: ['some-key'],
    queryFn: () => {
      // TODO:
      return '';
    },
  });

  return <PageLayout>${data}</PageLayout>;
};

export default MainPage;
