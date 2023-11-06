import type { JSX } from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { IWord } from '@learn-languages/common';
import { EMPTY_ARRAY } from '@learn-languages/common';
import type { FormListFieldData, FormListOperation, FormRule } from 'antd';
import { App, Button, Card, Form, Input, Space } from 'antd';

import { NEW_ID_PARAM, WORD_NAME_PARAM, WORDS_URL } from 'common/routes/routes-constants';
import EditWordFormList from 'features/words/EditWordFormList';
import { useSaveWord } from 'features/words/hooks/use-save-word';
import { useWordsQuery } from 'features/words/hooks/use-words-query';

const emptyForm: Partial<IWord> = {
  name: '',
  examples: [''],
  description: [''],
};

// TODO: add word validation regexp
const nameRules: FormRule[] = [{ required: true, message: 'Please enter word' }];

// TODO: use modal
const EditWordForm = (): JSX.Element => {
  const { [WORD_NAME_PARAM]: wordName } = useParams<Record<string, string>>();
  const isNew = wordName === NEW_ID_PARAM;
  const { data: wordList = EMPTY_ARRAY<IWord[]>(), isFetching } = useWordsQuery();
  const initialValues = useMemo<Partial<IWord>>(
    () => (isNew ? emptyForm : wordList.find(({ name }) => name === wordName) ?? emptyForm),
    [wordList, isNew, wordName],
  );
  const { _id: wordId, name: initialName } = initialValues;
  const [form] = Form.useForm();
  const { isFieldsTouched, resetFields } = form;

  useEffect(() => {
    if (initialValues) {
      resetFields();
    }
  }, [initialValues, resetFields]);

  const navigate = useNavigate();
  const navigateToWordsPage = useCallback(() => navigate(WORDS_URL), [navigate]);
  const { modal } = App.useApp();
  const handleCancel = useCallback(() => {
    if (isFieldsTouched(['name', 'examples', 'description'])) {
      void modal.confirm({
        content: 'Are you sure you want to close the form?',
        onOk: navigateToWordsPage,
      });
    } else {
      navigateToWordsPage();
    }
  }, [isFieldsTouched, modal, navigateToWordsPage]);

  const renderDescription = useCallback(
    (fields: FormListFieldData[], options: FormListOperation) => (
      <EditWordFormList<string> defaultAddValue='' fields={fields} label='Description' options={options} />
    ),
    [],
  );

  const renderExamples = useCallback(
    (fields: FormListFieldData[], options: FormListOperation) => (
      <EditWordFormList<string> defaultAddValue='' fields={fields} label='Examples' options={options} />
    ),
    [],
  );

  // TODO: it would be great to save only changed fields
  const { mutate: handleSave } = useSaveWord(wordId);
  return (
    <Card className='full-width full-height scroll-y' loading={isFetching}>
      {initialName || isNew ? (
        <Form
          className='full-width'
          disabled={isFetching}
          form={form}
          initialValues={initialValues}
          layout='vertical'
          onFinish={handleSave}
          size='large'
          validateTrigger='onSubmit'
        >
          <Form.Item label='Word' name='name' required={isNew} rules={nameRules}>
            <Input disabled={!isNew} />
          </Form.Item>
          <Form.List name='description'>{renderDescription}</Form.List>
          <Form.List name='examples'>{renderExamples}</Form.List>
          <Form.Item>
            <Space align='center' className='flex justify-center'>
              <Button htmlType='submit' type='primary'>
                Save
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      ) : (
        <div>Invalid word id: {wordName}</div>
      )}
    </Card>
  );
};

export default EditWordForm;
