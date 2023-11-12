import type { JSX } from 'react';
import { useCallback } from 'react';

import { PlusCircleOutlined } from '@ant-design/icons';
import type { FormListFieldData, FormListOperation } from 'antd';
import { Button, Form, Space } from 'antd';

import EditWordFormListItem from 'features/words/EditWordFormListItem';

export interface EditWordFormListProps<TValue = string> {
  readonly defaultAddValue: TValue;
  readonly fields: FormListFieldData[];
  readonly label: string;
  readonly options: FormListOperation;
}

const EditWordFormList = <TValue = string,>({
  defaultAddValue,
  fields,
  label,
  options: { add, remove },
}: EditWordFormListProps<TValue>): JSX.Element => {
  const handleAddClick = useCallback(() => add(defaultAddValue), [add, defaultAddValue]);
  return (
    <Form.Item
      className='full-width'
      label={
        <Space align='center'>
          <div>{label}</div>
          <Button icon={<PlusCircleOutlined />} onClick={handleAddClick} />
        </Space>
      }
    >
      {fields.map(({ key, name }) => (
        <EditWordFormListItem handleRemove={remove} key={key} name={name} />
      ))}
    </Form.Item>
  );
};

export default EditWordFormList;
