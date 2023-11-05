import type { JSX } from 'react';

import Spin from 'antd/lib/spin';

import PageLayout from 'common/components/PageLayout';

const LoadingPage = (): JSX.Element => (
  <PageLayout>
    <Spin size='large' />
  </PageLayout>
);

export default LoadingPage;
