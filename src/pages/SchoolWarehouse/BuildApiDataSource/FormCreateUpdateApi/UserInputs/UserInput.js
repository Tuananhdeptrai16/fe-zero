import React from 'react';
import { Col, Row, Tag } from 'antd';
import clsx from 'clsx';
import style from './userInput.module.scss';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import AntButton from 'src/@crema/component/AntButton';

export default function UserInput({
  inputName,
  index,
  name,
  isHiddenBtnDelete,
  remove,
  openChangeInput,
  ...attrs
}) {
  return (
    <Row className={clsx(style.inputUserItem)}>
      <Col span={22}>
        <div {...attrs} className='d-flex items-center justify-start gap-2'>
          <IntlMessages
            id={inputName}
            maxLength={80}
            style={{
              fontWeight: 500,
            }}
          />
          <Tag
            icon={<CheckCircleOutlined />}
            color={isHiddenBtnDelete ? 'success' : 'gold'}>
            {isHiddenBtnDelete ? 'Đầu vào sẵn có' : 'Đầu vào được thêm'}
          </Tag>
        </div>
      </Col>
      <Col span={1} className='d-flex justify-end'>
        <AntButton
          onClick={() => {
            openChangeInput(index);
          }}
          shape='circle'
          className='icon-btn'
          icon={
            <EditOutlined
              style={{
                fontSize: '16px',
              }}
            />
          }
        />
      </Col>
      {isHiddenBtnDelete ? (
        <></>
      ) : (
        <Col span={1} className='d-flex justify-end'>
          <AntButton
            onClick={() => remove(name)}
            shape='circle'
            className='icon-btn'
            icon={
              <DeleteOutlined
                style={{
                  fontSize: '16px',
                  color: 'red',
                }}
              />
            }
          />
        </Col>
      )}
    </Row>
  );
}
