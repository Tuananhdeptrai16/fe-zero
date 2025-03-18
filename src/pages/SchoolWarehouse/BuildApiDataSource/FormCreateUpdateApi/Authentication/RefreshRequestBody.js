import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Collapse, Form, Row } from 'antd';
import React, { useEffect } from 'react';
import { Panel } from 'src/@crema/component/AntCollapse';
import FormInput from 'src/@crema/core/Form/FormInput';
import AntButton from 'src/@crema/component/AntButton';
import FormHidden from 'src/@crema/core/Form/FormHidden';
import { isEqual } from 'lodash';

export default function RefreshRequestBody() {
  const refreshRequestBody = Form.useWatch([
    'definitions',
    'base_requester',
    'authenticator',
    'refresh_request_body',
  ]);
  const refreshRequestBodyTemp = Form.useWatch('refresh_request_body_temp');
  const form = Form.useFormInstance();
  useEffect(() => {
    const refreshRequestBodyKeys = Object.keys(refreshRequestBody || {});
    const refreshRequestBodyTemp = refreshRequestBodyKeys.map((key) => ({
      key,
      value: refreshRequestBody[key],
    }));
    form.setFieldValue('refresh_request_body_temp', refreshRequestBodyTemp);
  }, [refreshRequestBody]);

  useEffect(() => {
    const refreshRequestBodyNew = {};
    (refreshRequestBodyTemp || []).forEach(({ key, value }) => {
      refreshRequestBodyNew[key] = value;
    });
    if (!isEqual(refreshRequestBodyNew, refreshRequestBody)) {
      form.setFieldValue(
        [
          'definitions',
          'base_requester',
          'authenticator',
          'refresh_request_body',
        ],
        refreshRequestBodyNew,
      );
    }
  }, [refreshRequestBodyTemp]);

  return (
    <Collapse
      accordion
      ghost
      defaultActiveKey='refresh_request_body'
      activeKey='refresh_request_body'>
      <Panel
        showArrow={false}
        header='Làm mới nội dung yêu cầu'
        key='refresh_request_body'>
        <FormHidden
          name={[
            'definitions',
            'base_requester',
            'authenticator',
            'refresh_request_body',
          ]}
        />
        <Form.List name={'refresh_request_body_temp'}>
          {(fields, operation) => {
            const { add, remove } = operation;
            return (
              <div>
                {fields.map(({ key, name, ...restField }) => {
                  return (
                    <Row key={key} gutter={[12, 12]}>
                      <Col span={11}>
                        <FormInput
                          name={[name, 'key']}
                          label={'Khóa'}
                          required
                          {...restField}
                        />
                      </Col>
                      <Col span={11}>
                        <FormInput
                          name={[name, 'value']}
                          label={'Giá trị'}
                          required
                          {...restField}
                        />
                      </Col>
                      <Col
                        span={2}
                        className='d-flex justify-start items-center'>
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
                    </Row>
                  );
                })}
                <Form.Item className='d-flex items-center justify-center mb-0'>
                  <AntButton onClick={add} icon={<PlusOutlined />}>
                    Thêm mới
                  </AntButton>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </Panel>
    </Collapse>
  );
}
