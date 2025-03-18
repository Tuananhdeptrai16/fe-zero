import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Collapse, Form, Row } from 'antd';
import React, { useEffect } from 'react';
import { Panel } from 'src/@crema/component/AntCollapse';
import FormInput from 'src/@crema/core/Form/FormInput';
import AntButton from 'src/@crema/component/AntButton';
import FormHidden from 'src/@crema/core/Form/FormHidden';
import { isEqual } from 'lodash';
import notification from 'src/shared/utils/notification';

const REQUEST_PARAMETERS = ['retriever', 'requester', 'request_parameters'];
const REQUEST_PARAMETERS_TEMP = 'request_parameters_temp';

export default function QueryParameters() {
  const requestParameters = Form.useWatch(REQUEST_PARAMETERS);
  const requestParametersTemp = Form.useWatch(REQUEST_PARAMETERS_TEMP);
  const form = Form.useFormInstance();

  useEffect(() => {
    const requestParametersNew = {};
    (requestParametersTemp || []).forEach(({ key, value }) => {
      const listOldKey = Object.keys(requestParametersNew || {});
      if (listOldKey?.includes(key)) {
        notification.warning('Khóa đã tồn tại, vui lòng nhập khóa khác !');
      } else {
        requestParametersNew[key] = value;
      }
    });

    if (!isEqual(requestParametersNew, requestParameters)) {
      form.setFieldValue(REQUEST_PARAMETERS, requestParametersNew);
    }
  }, [requestParametersTemp]);

  return (
    <Collapse accordion>
      <Panel header='Tham số truy vấn' key='request_parameters'>
        <FormHidden name={REQUEST_PARAMETERS} />
        <Form.List name={REQUEST_PARAMETERS_TEMP}>
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
