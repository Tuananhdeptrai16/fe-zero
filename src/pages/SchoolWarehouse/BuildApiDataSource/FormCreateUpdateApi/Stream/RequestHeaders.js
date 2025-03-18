import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Collapse, Form, Row } from 'antd';
import React, { useEffect } from 'react';
import { Panel } from 'src/@crema/component/AntCollapse';
import FormInput from 'src/@crema/core/Form/FormInput';
import AntButton from 'src/@crema/component/AntButton';
import FormHidden from 'src/@crema/core/Form/FormHidden';
import { isEqual } from 'lodash';
import notification from 'src/shared/utils/notification';

const REQUEST_HEADERS = ['retriever', 'requester', 'request_headers'];
const REQUEST_HEADERS_TEMP = 'request_headers_temp';

export default function RequestHeaders() {
  const requestHeaders = Form.useWatch(REQUEST_HEADERS);
  const requestHeadersTemp = Form.useWatch(REQUEST_HEADERS_TEMP);
  const form = Form.useFormInstance();

  useEffect(() => {
    const requestHeadersNew = {};
    (requestHeadersTemp || []).forEach(({ key, value }) => {
      const listOldKey = Object.keys(requestHeadersNew || {});
      if (listOldKey?.includes(key)) {
        notification.warning('Khóa đã tồn tại, vui lòng nhập khóa khác !');
      } else {
        requestHeadersNew[key] = value;
      }
    });
    if (!isEqual(requestHeadersNew, requestHeaders)) {
      form.setFieldValue(REQUEST_HEADERS, requestHeadersNew);
    }
  }, [requestHeadersTemp]);

  return (
    <Collapse accordion>
      <Panel header='Tiêu đề yêu cầu' key='request_headers'>
        <FormHidden name={REQUEST_HEADERS} />
        <Form.List name={REQUEST_HEADERS_TEMP}>
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
