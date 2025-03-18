import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Collapse, Form, Row } from 'antd';
import React, { useEffect } from 'react';
import { Panel } from 'src/@crema/component/AntCollapse';
import FormInput from 'src/@crema/core/Form/FormInput';
import AntButton from 'src/@crema/component/AntButton';
import FormHidden from 'src/@crema/core/Form/FormHidden';
import { isEqual } from 'lodash';
import notification from 'src/shared/utils/notification';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import FormSelect from 'src/@crema/core/Form/FormSelect';
// import clsx from 'clsx';

const REQUEST_BODY = ['retriever', 'requester', 'request_body_json'];
const REQUEST_BODY_TEMP = 'request_body_temp';
const REQUEST_BODY_TEMP1 = 'request_body_temp1';

export default function RequestBody() {
  const requestBody = Form.useWatch(REQUEST_BODY);
  const requestBodyTemp = Form.useWatch(REQUEST_BODY_TEMP);
  const requestBodyTemp1 = Form.useWatch(REQUEST_BODY_TEMP1);
  const form = Form.useFormInstance();
  const typeRequestBody = Form.useWatch('type_request_body', form) || '';

  const stringToObject = (str) => {
    // Add double quotes around the keys using a regular expression
    const jsonFormattedStr = str.replace(/(\w+)\s*:/g, '"$1":');

    // Parse the JSON-formatted string to an object
    try {
      const obj = JSON.parse(jsonFormattedStr);
      return obj;
    } catch (error) {
      console.error('Invalid JSON format', error);
      return null;
    }
  };

  const convertValuesToStrings = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === 'number') {
        // Convert numbers to strings
        obj[key] = String(obj[key]);
      } else if (Array.isArray(obj[key])) {
        // Convert arrays to strings
        obj[key] = JSON.stringify(obj[key]);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        // Recursively convert objects
        convertValuesToStrings(obj[key]);
      }
    }
    return obj;
  };

  useEffect(() => {
    const requestBodyNew = {};
    if (requestBodyTemp) {
      (requestBodyTemp || []).forEach(({ key, value }) => {
        const listOldKey = Object.keys(requestBodyNew || {});
        if (listOldKey?.includes(key)) {
          notification.warning('Khóa đã tồn tại, vui lòng nhập khóa khác !');
        } else {
          requestBodyNew[key] = value;
        }
      });
      if (!isEqual(requestBodyNew, requestBody)) {
        form.setFieldValue(REQUEST_BODY, requestBodyNew);
      }
    }
    if (requestBodyTemp1) {
      const request = convertValuesToStrings(stringToObject(requestBodyTemp1));
      form.setFieldValue(REQUEST_BODY, request);
    }
  }, [requestBodyTemp, requestBodyTemp1]);

  return (
    <Collapse accordion>
      <Panel header='Nội dung json' key='request_body'>
        <FormHidden name={REQUEST_BODY} />
        <FormSelect
          name={'type_request_body'}
          // label='Phần thân yêu cầu'
          options={[
            {
              label: 'Yêu cầu json (khóa - giá trị )',
              value: 'request_body_json',
            },
            {
              label: 'Nội dung dưới dạng chuỗi',
              value: 'request_body_data',
            },
          ]}
        />
        {typeRequestBody === 'request_body_json' && (
          <Form.List name={REQUEST_BODY_TEMP}>
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
        )}
        {typeRequestBody === 'request_body_data' && (
          <Col span={24}>
            <FormTextArea
              name={REQUEST_BODY_TEMP1}
              // label='Nội dung yêu cầu dưới dạng chuỗi'
            />
          </Col>
        )}
        {/* <Col span={24}>
          <FormSelect
            name={'type_request_body'}
            // label='Phần thân yêu cầu'
            options={[
              {
                label: 'Yêu cầu json (khóa - giá trị )',
                value: 'request_body_json',
              },
              {
                label: 'Nội dung dưới dạng chuỗi',
                value: 'request_body_data',
              },
            ]}
          />
        </Col>
        {typeRequestBody === 'request_body_json' && (
          <Col span={24}>
            <Form.List name={'request_body_json'}>
              {(fields, operation) => {
                const { add, remove } = operation;
                return (
                  <div>
                    {fields.map(({ key, name, ...restField }) => {
                      return (
                        <Row key={key} gutter={[12, 12]}>
                          <Col span={11}>
                            <FormInput
                              name={[name, 'key_request_body_json']}
                              label={'Khóa'}
                              required
                              {...restField}
                            />
                          </Col>
                          <Col span={11}>
                            <FormInput
                              name={[name, 'value_request_body_json']}
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
          </Col>
        )}
        {typeRequestBody === 'request_body_data' && (
          <Col span={24}>
            <FormTextArea
              name='request_body_json'
              // label='Nội dung yêu cầu dưới dạng chuỗi'
            />
          </Col>
        )} */}
      </Panel>
    </Collapse>
  );
}
