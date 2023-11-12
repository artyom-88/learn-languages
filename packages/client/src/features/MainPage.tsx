import type { JSX } from 'react';
import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';

import { ReloadOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';

import { WORDS_URL } from 'common/routes/routes-constants';
import { useWordsQuery } from 'features/words/hooks/use-words-query';

const MainPage = (): JSX.Element => {
  const { data = [], refetch, isFetching } = useWordsQuery({ enabled: true });
  const handleRefetchClick = useCallback(() => refetch(), [refetch]);
  return (
    <Space align='center' className='full-height full-width' direction='vertical'>
      <Button icon={<ReloadOutlined />} loading={isFetching} onClick={handleRefetchClick} />
      <Space>
        {data.length ? (
          data.map(({ name }) => (
            <NavLink key={name} to={`${WORDS_URL}/${name}`}>
              {name}
            </NavLink>
          ))
        ) : (
          <div>No words have been added yet</div>
        )}
      </Space>
    </Space>
  );
};

export default MainPage;
