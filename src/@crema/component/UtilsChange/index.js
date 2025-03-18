import React from 'react';
import { Col, Empty, Radio, Row, Space, Typography } from 'antd';
import AntTag from 'src/@crema/component/AntTag';
import { isEqual } from 'lodash';
import { isEmpty } from 'src/shared/utils/Typeof';

const { Text } = Typography;
const RenderOptions = ({ value, disabled, options = [], label, onChange }) => {
  const listOptionIds = options.map((option) => option?.id);
  const checked = isEqual(value, listOptionIds);

  const content = (
    <>
      {label && <p style={{ fontWeight: 500 }}>{label}</p>}
      <Space wrap>
        {isEmpty(options) && <Empty description={'Không chọn tiện ích nào'} />}
        {options?.map((option) => (
          <AntTag
            key={option?.id}
            color={checked && 'gold'}
            style={{
              padding: '2px 8px',
              borderRadius: 20,
            }}>
            {option?.name}
          </AntTag>
        ))}
      </Space>
    </>
  );

  if (disabled) {
    return <div>{content}</div>;
  }

  return (
    <Radio
      className='ant-align-start'
      onChange={onChange}
      value={listOptionIds}
      checked={checked}>
      {content}
    </Radio>
  );
};

const UtilsChange = ({ value, onChange, options, disabled }) => {
  const origin = options.find((option) => option?.id === 'origin');
  const change = options.find((option) => option?.id === 'change');

  //* Get full name of owner
  const getFullName = (item) => {
    const { user_name } = item?.item || '';
    return user_name ? `${user_name}: ` : '';
  };

  if (disabled) {
    return (
      <>
        <div>
          <Text type='secondary'>{origin?.label}</Text>
        </div>
        {origin?.options?.map((option, index) => (
          <RenderOptions
            key={`origin-${index}`}
            disabled
            value={value}
            options={option?.value || []}
            onChange={(e) => {
              onChange(e?.target?.value);
            }}
          />
        ))}
      </>
    );
  }

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <Space direction='vertical'>
            <Text type='secondary'>{origin?.label}</Text>
            {origin?.options?.map((option, index) => (
              <RenderOptions
                key={`origin-${index}`}
                value={value}
                options={option?.value || []}
                onChange={(e) => {
                  onChange(e?.target?.value);
                }}
              />
            ))}
          </Space>
        </Col>
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <Space direction='vertical'>
            <div>
              <Text type='secondary'>{change?.label}</Text>
            </div>
            {change?.options?.map((option, index) => (
              <RenderOptions
                key={`change-${index}`}
                label={getFullName(option)}
                value={value}
                onChange={(e) => {
                  onChange(e?.target?.value);
                }}
                options={option?.value || []}
              />
            ))}
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default UtilsChange;
