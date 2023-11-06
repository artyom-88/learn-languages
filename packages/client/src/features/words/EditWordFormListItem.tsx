import { useCallback } from 'react';

import { MinusCircleOutlined } from '@ant-design/icons';
import type { FormRule } from 'antd';
import { Button, Form, Input } from 'antd';

import styles from './EditWordFormListItem.module.scss';

interface EditWordFormDescriptionItemProps {
  readonly handleRemove: (index: number) => void;
  readonly name: number;
}

const validationRules: FormRule[] = [{ required: true, message: 'Please enter a value' }];

const EditWordFormListItem = ({ handleRemove, name }: EditWordFormDescriptionItemProps) => {
  const handleRemoveClick = useCallback(() => handleRemove(name), [name, handleRemove]);
  return (
    <div className='flex justify-between full-width'>
      <Form.Item className='flex-grow-1' isListField key={name} name={name} rules={validationRules}>
        <Input.TextArea className='full-width' />
      </Form.Item>
      <Form.Item className={styles.minusBtn}>
        <Button icon={<MinusCircleOutlined />} onClick={handleRemoveClick} />
      </Form.Item>
    </div>
  );
};

export default EditWordFormListItem;
