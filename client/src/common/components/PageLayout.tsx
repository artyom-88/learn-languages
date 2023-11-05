import type { JSX, PropsWithChildren } from 'react';

import { Layout } from 'antd';

const PageLayout = ({ children }: PropsWithChildren): JSX.Element => (
  <Layout className='flex flex-column full-width full-height align-center justify-center'>{children}</Layout>
);

export default PageLayout;
