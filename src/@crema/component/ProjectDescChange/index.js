import React from 'react';
import { Col, Empty, Radio, Row, Space, Typography } from 'antd';
import RenderContentHTML from 'src/@crema/component/TableRender/RenderContentHTML';

const { Text } = Typography;

const RenderOptions = ({ value, disabled, label, options, onChange }) => {
  const checked = value === options;
  const content = (
    <>
      {label && <p style={{ fontWeight: 500 }}>{label}</p>}
      {!options && <Empty description={'Không có dữ liệu'} />}
      {options && (
        <div className='ant-input'>
          <RenderContentHTML content={options} isShowHTML shortNumWord={1000} />
        </div>
      )}
    </>
  );
  if (disabled) {
    return <>{content}</>;
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
const ProjectDescChange = ({ value, onChange, options, disabled }) => {
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
        {origin?.options?.map((option, index) => (
          <RenderOptions
            key={`origin-disabled-${index}`}
            disabled
            options={option?.value}
            value={value}
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
            <div>
              <Text type='secondary'>{origin?.label}</Text>
            </div>
            {origin?.options?.map((option, index) => (
              <RenderOptions
                key={`$origin-${index}`}
                value={value || ''}
                options={option?.value || ''}
                onChange={(e) => {
                  onChange(e.target.value);
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
                key={`change-cdn-${index}`}
                label={getFullName(option)}
                options={option?.value || ''}
                value={value || ''}
                onChange={(e) => {
                  onChange(e?.target?.value);
                }}
              />
            ))}
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default ProjectDescChange;
