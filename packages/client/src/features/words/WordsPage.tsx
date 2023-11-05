import type { JSX } from 'react';
import { useCallback } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { Button, Space } from 'antd';

import { useDebug } from 'common/hooks/use-debug';
import { WORDS_URL } from 'common/routes/routes-constants';
import { useWordsQuery } from 'features/words/hooks/use-words-query';

const WordsPage = (): JSX.Element => {
  useDebug('WordsPage');
  const { data = [] } = useWordsQuery();
  const navigate = useNavigate();
  const { wordId = '' } = useParams<Record<string, string>>();
  const handleAdd = useCallback(() => navigate(`${WORDS_URL}/_new`), [navigate]);
  const handleCancel = useCallback(() => navigate(WORDS_URL), [navigate]);

  return (
    <Space direction='vertical'>
      <div>{wordId ? <Button onClick={handleCancel}>Cancel</Button> : <Button onClick={handleAdd}>Add</Button>}</div>
      <div className='flex justify-between'>
        {data.map(({ name }) => (
          <span key={name}>{name}</span>
        ))}
        <Outlet />
      </div>
    </Space>
  );
};

export default WordsPage;
