import type { JSX } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { Layout, Space } from 'antd';

import { dayjs } from 'common/common-date';
import { ROOT_URL, WORDS_URL } from 'common/routes/routes-constants';

import styles from './PageLayout.module.scss';

const layoutClassName = 'flex flex-column align-center full-width full-height';

const contentClassName = `${layoutClassName} ${styles.content}`;

const currentYear = dayjs.utc().year();

const PageLayout = (): JSX.Element => (
  <Layout className={layoutClassName}>
    <Layout.Header className='full-width'>
      <Space align='center' className='flex justify-center'>
        <NavLink to={ROOT_URL}>Home</NavLink>
        <NavLink to={WORDS_URL}>Words</NavLink>
      </Space>
    </Layout.Header>
    <Layout.Content className={contentClassName}>
      <Outlet />
    </Layout.Content>
    <Layout.Footer>© {currentYear} All rights reserved</Layout.Footer>
  </Layout>
);

export default PageLayout;
