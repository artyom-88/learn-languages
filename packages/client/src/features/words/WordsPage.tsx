import type { JSX } from 'react';
import { Fragment, useCallback } from 'react';
import { NavLink, useNavigate, useOutlet, useParams } from 'react-router-dom';

import { PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import type { IWord } from '@learn-languages/common';
import { Button, Col, Divider, Row, Skeleton, Space, Typography } from 'antd';

import LoadingPage from 'common/components/LoadingPage';
import { WORD_NAME_PARAM, WORDS_URL } from 'common/routes/routes-constants';
import { GET_DETAILED_WORD_LIST, useWordsQuery } from 'features/words/hooks/use-words-query';

const rowGutter = 36;

const WordsPage = (): JSX.Element => {
  const { words = [], loading, refetch } = useWordsQuery(GET_DETAILED_WORD_LIST);
  const navigate = useNavigate();
  const { [WORD_NAME_PARAM]: wordName = '' } = useParams<Record<string, string>>();
  const handleAdd = useCallback(() => navigate(`${WORDS_URL}/_new`), [navigate]);
  const handleRefetchClick = useCallback(() => refetch(), [refetch]);

  const renderItem = useCallback(
    ({ description = [], name, examples = [] }: IWord) => (
      <Fragment key={name}>
        <Divider />
        <Row gutter={rowGutter}>
          <Col span={4}>
            <NavLink to={`${WORDS_URL}/${name}`}>{name}</NavLink>
          </Col>
          <Col span={8}>
            <Space direction='vertical'>
              {description.map((value: string) => (
                <div key={value}>{value}</div>
              ))}
            </Space>
          </Col>
          <Col span={12}>
            <Space direction='vertical'>
              {examples.map((value: string) => (
                <div key={value}>{value}</div>
              ))}
            </Space>
          </Col>
        </Row>
      </Fragment>
    ),
    [],
  );

  const outlet = useOutlet();
  const showOutlet = !!outlet;
  const listSpan = showOutlet ? 12 : 24;
  // TODO: sticky header
  return (
    <Row className='full-height full-width' gutter={rowGutter}>
      <Col className='full-height scroll-y' span={listSpan}>
        <Space className='full-width' direction='vertical'>
          <Space align='center' className='flex'>
            <Button disabled={!!wordName} icon={<PlusCircleOutlined />} onClick={handleAdd} />
            <Button icon={<ReloadOutlined />} loading={loading} onClick={handleRefetchClick} />
          </Space>
          {words.length ? (
            <>
              <Row gutter={rowGutter}>
                <Col span={4}>
                  <Typography.Title level={5}>Word</Typography.Title>
                </Col>
                <Col span={8}>
                  <Typography.Title level={5}>Description</Typography.Title>
                </Col>
                <Col span={12}>
                  <Typography.Title level={5}>Examples</Typography.Title>
                </Col>
              </Row>
              <Skeleton loading={loading}>{words.map(renderItem)}</Skeleton>
            </>
          ) : (
            <div>No words have been added yet</div>
          )}
        </Space>
      </Col>
      {showOutlet ? (
        <Col className='full-height' span={12}>
          {loading ? <LoadingPage /> : outlet}
        </Col>
      ) : null}
    </Row>
  );
};

export default WordsPage;
