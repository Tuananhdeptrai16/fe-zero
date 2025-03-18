import { DeleteOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Collapse, Dropdown, Form, Row, Tooltip } from 'antd';
import React from 'react';
import { Panel } from 'src/@crema/component/AntCollapse';
import AppCard from 'src/@crema/core/AppCard';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import style from '../ListApiDataSource.module.scss';
import clsx from 'clsx';
import AntButton from 'src/@crema/component/AntButton';
// import PropTypes from 'prop-types';

FormOAuthAuthenticator.propTypes = {};

function FormOAuthAuthenticator({ watchInputUser }) {
  const form = Form.useFormInstance();
  // const watchGrantType = Form.useWatch('grant_type', form) || '';

  const itemsDropDownAuth = watchInputUser?.map((item) => {
    return {
      key: item?.id_input_user,
      label: item?.title_input_user,
    };
  });
  const menuPropsOauth = {
    items: itemsDropDownAuth,
    onClick: (data) => {
      form.setFieldValue(
        'token_refresh_endpoint',
        `{{ config["${data?.key}"] }}`,
      );
      form.validateFields(['token_refresh_endpoint']);
    },
  };
  return (
    <div className={clsx(style.wrapFormAuth)}>
      <AppCard>
        <Row>
          <Col span={24}>
            <FormInput
              label='Điểm cuối làm mới mã thông báo'
              name='token_refresh_endpoint'
              required
              addonAfter={
                <Dropdown
                  overlayStyle={{
                    zIndex: 1052,
                  }}
                  menu={menuPropsOauth}
                  placement='bottomRight'>
                  <Tooltip title='Chèn giá trị từ đầu vào của người dùng'>
                    <UserOutlined />
                  </Tooltip>
                </Dropdown>
              }
            />
          </Col>
          <Col span={24}>
            <FormSelect
              required
              name='grant_type'
              label='Loại hỗ trợ'
              options={[
                {
                  label: 'Làm mới token',
                  value: 'refresh_token',
                },
                {
                  label: 'Thông tin xác thực người dùng',
                  value: 'client_credentials',
                },
              ]}
            />
          </Col>
          {/* {watchGrantType === 'refresh_token' && (
            <Col span={24}>
              <FormInput
                label='Ghi đè cấu hình phản hồi với token làm mới'
                name='refresh_token_name'
              />
            </Col>
          )} */}

          <Col span={24}>
            <Collapse accordion>
              <Panel header='Các trường tùy chọn' key='option_auth'>
                <Row>
                  <Col span={24}>
                    <FormSelect mode={'tags'} label='Phạm vi' name='scopes' />
                  </Col>
                  <Col span={24}>
                    <FormInput
                      label='Định dạng ngày hết hạn của token'
                      name='token_expiry_date_format'
                      placeholder='%Y-%m-%d %H:%M:%S.%f+00:00'
                    />
                  </Col>
                  <Col span={24}>
                    <FormInput
                      label='Tên thuộc tính hết hạn của token'
                      name='expires_in_name'
                    />
                  </Col>
                  <Col span={24}>
                    <FormInput
                      label='Tên thuộc tính mã thông báo truy cập'
                      name='access_token_name'
                    />
                  </Col>
                  <Col span={24}>
                    <Collapse
                      accordion
                      ghost
                      className={clsx(style.refresh_request_body)}
                      defaultActiveKey='refresh_request_body'
                      activeKey='refresh_request_body'>
                      <Panel
                        showArrow={false}
                        header='Làm mới nội dung yêu cầu'
                        key='refresh_request_body'>
                        <Form.List name={'refresh_request_body'}>
                          {(fields, operation) => {
                            const { add, remove } = operation;
                            return (
                              <div>
                                {fields.map(({ key, name, ...restField }) => {
                                  return (
                                    <Row key={key} gutter={[12, 12]}>
                                      <Col span={11}>
                                        <FormInput
                                          name={[
                                            name,
                                            'key_refresh_request_body',
                                          ]}
                                          label={'Khóa'}
                                          required
                                          {...restField}
                                        />
                                      </Col>
                                      <Col span={11}>
                                        <FormInput
                                          name={[
                                            name,
                                            'value_refresh_request_body',
                                          ]}
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
                                  <AntButton
                                    onClick={add}
                                    icon={<PlusOutlined />}>
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
                </Row>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </AppCard>
    </div>
  );
}

export default FormOAuthAuthenticator;
