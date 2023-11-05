import type { JSX } from 'react';
import { NavLink } from 'react-router-dom';

import { Space } from 'antd';

import { WORDS_URL } from 'common/routes/routes-constants';
import { useWordsQuery } from 'features/words/hooks/use-words-query';

const MainPage = (): JSX.Element => {
  const { data = [] } = useWordsQuery();
  return (
    <Space align='center' className='full-height full-width' direction='vertical'>
      {data.length ? data.map(({ name }) => <span key={name}>{name}</span>) : <div>No words have been added yet</div>}
      <NavLink to={WORDS_URL}>Edit words</NavLink>
    </Space>
  );
};

export default MainPage;
