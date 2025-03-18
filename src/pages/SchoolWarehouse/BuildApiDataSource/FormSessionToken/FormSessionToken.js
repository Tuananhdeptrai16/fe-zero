import { Col, Collapse, Form, Row } from 'antd';
import React from 'react';
import AppCard from 'src/@crema/core/AppCard';
import style from '../ListApiDataSource.module.scss';
import clsx from 'clsx';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { Panel } from 'src/@crema/component/AntCollapse';
import AntButton from 'src/@crema/component/AntButton';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
// import PropTypes from 'prop-types';

FormSessionToken.propTypes = {};

function FormSessionToken() {
  const form = Form.useFormInstance();
  const typeRequestBodySession =
    Form.useWatch('type_request_body_session', form) || '';
  const typeRequestAuthentication =
    Form.useWatch('type_request_authentication', form) || '';

  return (
    <div className={clsx(style.wrapFormSessionToken)}>
      <AppCard>
        <Row>
          <Col span={24}>
            <FormInput label='URL' name='url_base_session_token' required />
          </Col>
          <Col span={24}>
            <FormSelect
              label='Phương thức HTTP'
              name='http_method_session_token'
              required
              options={[
                {
                  label: 'GET',
                  value: 'GET',
                },
                {
                  label: 'POST',
                  value: 'POST',
                },
              ]}
            />
          </Col>
          <Col span={24}>
            <FormSelect
              mode='tags'
              name={'session_token_path'}
              label='Đường dẫn mã thông báo phiên'
              required
            />
          </Col>
          <Col span={24}>
            <FormSelect
              label='Thời gian hết hạn'
              name='expiration_duration_session_token'
              options={[
                {
                  label: '1 giờ',
                  value: 'PT1H',
                },
                {
                  label: '1 ngày',
                  value: 'P1D',
                },
                {
                  label: '1 tuần',
                  value: 'P1W',
                },
                {
                  label: '1 tháng',
                  value: 'P1M',
                },
                {
                  label: '1 năm',
                  value: 'P1Y',
                },
              ]}
            />
          </Col>
          <Col span={24}>
            <Collapse accordion className={clsx(style.request_parameters)}>
              <Panel header='Tham số truy vấn' key='request_parameters'>
                <Form.List name={'request_parameters'}>
                  {(fields, operation) => {
                    const { add, remove } = operation;
                    return (
                      <div>
                        {fields.map(({ key, name, ...restField }) => {
                          return (
                            <Row key={key} gutter={[12, 12]}>
                              <Col span={11}>
                                <FormInput
                                  name={[name, 'key_request_parameters']}
                                  label={'Khóa'}
                                  required
                                  {...restField}
                                />
                              </Col>
                              <Col span={11}>
                                <FormInput
                                  name={[name, 'value_request_parameters']}
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
          </Col>
          <Col span={24}>
            <Collapse accordion className={clsx(style.request_parameters)}>
              <Panel header='Tiêu đề yêu cầu' key='request_headers'>
                <Form.List name={'request_headers'}>
                  {(fields, operation) => {
                    const { add, remove } = operation;
                    return (
                      <div>
                        {fields.map(({ key, name, ...restField }) => {
                          return (
                            <Row key={key} gutter={[12, 12]}>
                              <Col span={11}>
                                <FormInput
                                  name={[name, 'key_request_headers']}
                                  label={'Khóa'}
                                  required
                                  {...restField}
                                />
                              </Col>
                              <Col span={11}>
                                <FormInput
                                  name={[name, 'value_request_headers']}
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
          </Col>
          <Col span={24}>
            <FormSelect
              name={'type_request_body_session'}
              label='Phần thân yêu cầu'
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
          {typeRequestBodySession === 'request_body_json' && (
            <Col span={24}>
              <Collapse accordion className={clsx(style.request_parameters)}>
                <Panel header='Nội dung json' key='request_body_json'>
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
                </Panel>
              </Collapse>
            </Col>
          )}
          {typeRequestBodySession === 'request_body_data' && (
            <Col span={24}>
              <FormTextArea
                name='request_body_data'
                label='Nội dung yêu cầu dưới dạng chuỗi'
              />
            </Col>
          )}
          <Col span={24}>
            <FormSelect
              name='type_request_authentication'
              label='Xác thực yêu cầu dữ liệu'
              required
              options={[
                {
                  label: 'Bearer',
                  value: 'Bearer',
                },
                {
                  label: 'ApiKey',
                  value: 'ApiKey',
                },
              ]}
            />
          </Col>
          <Col span={24}>
            {typeRequestAuthentication === 'ApiKey' && (
              <Row>
                <Col span={24}>
                  <FormSelect
                    allowClear={false}
                    label='Thêm vào'
                    required
                    getPopupContainer={(trigger) => trigger.parentNode}
                    name='inject_into'
                    options={[
                      {
                        label: 'Header',
                        value: 'header',
                      },
                      {
                        label: 'Query Parameter',
                        value: 'request_parameter',
                      },
                    ]}
                  />
                </Col>
                <Col span={24}>
                  <FormInput
                    label='Giá trị'
                    required
                    name='field_name_inject_into'
                  />
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </AppCard>
    </div>
  );
}

export default FormSessionToken;
