import React from 'react';
import { Col, Radio, Row, Space, Typography } from 'antd';
import { isEqual } from 'lodash';
import ListMedia from 'src/@crema/component/ListMedia';
import { isEmpty } from 'src/shared/utils/Typeof';

const { Text } = Typography;
const RenderOptions = ({ disabled, value, options = [], label, onChange }) => {
  const checked = isEqual(value, options);
  const listMedia = options.map((option) => ({
    src: option?.cdn_path || option?.path,
  }));

  const content = (
    <>
      {label && <p style={{ fontWeight: 500 }}>{label}</p>}
      {isEmpty(listMedia) && <p>Dữ liệu trống</p>}
      {
        <ListMedia
          data={listMedia}
          sizeItem={{ width: 150, height: 88 }}
          controls
          wrap
        />
      }
    </>
  );

  if (disabled) {
    return <div>{content}</div>;
  }

  return (
    <Radio
      onChange={onChange}
      value={options}
      checked={checked}
      className='ant-align-start'>
      {content}
    </Radio>
  );
};

const MediasChange = ({ value, onChange, options, disabled }) => {
  const origin = options.find((option) => option?.id === 'origin');
  const change = options.find((option) => option?.id === 'change');
  //* Get full name of owner
  const getFullName = (item) => {
    const { user_name } = item?.item || '';
    return user_name ? `${user_name}: ` : '';
  };

  if (disabled) {
    return origin?.options?.map((option, index) => (
      <RenderOptions
        key={`origin-${index}`}
        disabled
        value={value}
        options={option?.value || []}
        onChange={(e) => {
          onChange(e?.target?.value);
        }}
      />
    ));
  }

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <Space direction='vertical'>
            <div>
              <Text type='secondary'>{origin?.label}</Text>
            </div>
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

export default MediasChange;
