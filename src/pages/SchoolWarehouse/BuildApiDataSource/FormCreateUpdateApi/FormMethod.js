import { Col, Collapse, Form, Row, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import style from '../ListApiDataSource.module.scss';
import clsx from 'clsx';
import AppCard from 'src/@crema/core/AppCard';
import FormInput from 'src/@crema/core/Form/FormInput';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import AntButton from 'src/@crema/component/AntButton';
import AntModal from 'src/@crema/component/AntModal';
import FormContent from 'src/@crema/component/FormContent';
import { isEmpty } from 'src/shared/utils/Typeof';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import FormStreams from '../FormStreams/FormStreams';
import FormInputUser from '../FormInputUser/FormInputUser';
import FormOAuthAuthenticator from '../FormOAuthAuthenticator/FormOAuthAuthenticator';
import FormSessionToken from '../FormSessionToken/FormSessionToken';
const { Panel } = Collapse;
// import PropTypes from 'prop-types';

FormMethod.propTypes = {};

function FormMethod({ rowData, initBuilderApi }) {
  const form = Form.useFormInstance();
  const methodTypeWatch = Form.useWatch('method_auth_type', form) || '';
  const watchInputUser = Form.useWatch('connection_specification', form) || [];

  const refFormInputUser = useRef();
  const refAddInputUser = useRef();
  const [isOpenAddInputUser, setIsOpenAddInputUser] = useState(false);
  const [initUpdateInputUser, setInitUpdateUser] = useState(false);
  const [nameInputUserItem, setNameInputUserItem] = useState();

  useEffect(() => {
    // ApiKeyAuthenticator || BearerAuthenticator
    if (
      methodTypeWatch === 'ApiKeyAuthenticator' ||
      methodTypeWatch === 'BearerAuthenticator'
    ) {
      const indexOldApiKey = watchInputUser?.findIndex(
        (item) => item?.id === 'api_key',
      );
      const newListInputUser = [
        ...watchInputUser,
        {
          id: 'api_key',
          id_input_user: 'api_key',
          title_input_user: 'API Key',
          type_input_user: 'string',
          secret_field_input_user: true,
          required_field_input_user: true,
          hint_input_user: 'api_key',
        },
      ]?.filter(
        (item) =>
          item?.id !== 'username' &&
          item?.id !== 'password' &&
          item?.id !== 'client_id' &&
          item?.id !== 'client_secret' &&
          item?.id !== 'client_refresh_token',
      );
      if (indexOldApiKey === -1) {
        form.setFieldValue('connection_specification', newListInputUser);
      }
    }
    // BasicHttpAuthenticator
    if (methodTypeWatch === 'BasicHttpAuthenticator') {
      const indexOldHttpUser = watchInputUser?.findIndex(
        (item) => item?.id === 'username',
      );
      const indexOldHttpPsw = watchInputUser?.findIndex(
        (item) => item?.id === 'password',
      );
      const newListInputUserHttp = [
        ...watchInputUser,
        {
          id: 'username',
          id_input_user: 'username',
          title_input_user: 'Tên tài khoản',
          type_input_user: 'string',
          hint_input_user: 'username',
          required_field_input_user: true,
        },
        {
          id: 'password',
          id_input_user: 'password',
          title_input_user: 'Mật khẩu',
          type_input_user: 'string',
          secret_field_input_user: true,
          hint_input_user: 'password',
          always_show: true,
        },
      ]?.filter((item) => {
        return (
          item?.id !== 'api_key' &&
          item?.id !== 'client_id' &&
          item?.id !== 'client_secret' &&
          item?.id !== 'client_refresh_token'
        );
      });
      if (indexOldHttpUser === -1 && indexOldHttpPsw === -1) {
        form.setFieldValue('connection_specification', newListInputUserHttp);
      }
    }
    // OAuthAuthenticator
    if (methodTypeWatch === 'OAuthAuthenticator') {
      const indexOldHttpClientId = watchInputUser?.findIndex(
        (item) => item?.id === 'client_id',
      );
      const indexOldClientSecret = watchInputUser?.findIndex(
        (item) => item?.id === 'client_secret',
      );
      const indexOldClientRefreshToken = watchInputUser?.findIndex(
        (item) => item?.id === 'client_refresh_token',
      );
      const newListInputOAuthAuthenticator = [
        ...watchInputUser,
        {
          id: 'client_id',
          id_input_user: 'client_id',
          title_input_user: 'Client ID',
          type_input_user: 'string',
          hint_input_user: 'client_id',
          secret_field_input_user: true,
          required_field_input_user: true,
        },
        {
          id: 'client_secret',
          id_input_user: 'client_secret',
          title_input_user: 'Client secret',
          type_input_user: 'string',
          secret_field_input_user: true,
          required_field_input_user: true,
          hint_input_user: 'client_secret',
        },
        {
          id: 'client_refresh_token',
          id_input_user: 'client_refresh_token',
          title_input_user: 'Refresh token',
          type_input_user: 'string',
          secret_field_input_user: true,
          required_field_input_user: true,
          hint_input_user: 'client_refresh_token',
        },
      ]?.filter((item) => {
        return (
          item?.id !== 'api_key' &&
          item?.id !== 'username' &&
          item?.id !== 'password'
        );
      });
      if (
        indexOldHttpClientId === -1 &&
        indexOldClientSecret === -1 &&
        indexOldClientRefreshToken === -1
      ) {
        form.setFieldValue(
          'connection_specification',
          newListInputOAuthAuthenticator,
        );
      }
    }
    // not_auth || SessionTokenAuthenticator
    if (
      methodTypeWatch === 'not_auth' ||
      methodTypeWatch === 'SessionTokenAuthenticator'
    ) {
      const newListInputNotAuth = [...watchInputUser]?.filter((item) => {
        return (
          item?.id !== 'api_key' &&
          item?.id !== 'username' &&
          item?.id !== 'password' &&
          item?.id !== 'client_id' &&
          item?.id !== 'client_secret' &&
          item?.id !== 'client_refresh_token'
        );
      });
      form.setFieldValue('connection_specification', newListInputNotAuth);
    }
  }, [methodTypeWatch, form]);

  return (
    <Row>
      <Col span={24}>
        <Row className={clsx(style.wrapFormMethod)}>
          <Col span={24}>
            <div
              className={clsx(
                style.methodHeader,
                'd-flex items-center justify-between',
              )}>
              <h5 className='mb-0'>Phương pháp</h5>
              <FormSelect
                allowClear={false}
                getPopupContainer={(trigger) => trigger.parentNode}
                name='method_auth_type'
                style={{
                  minWidth: '140px',
                }}
                options={[
                  {
                    label: 'Không xác thực',
                    value: 'not_auth',
                  },
                  {
                    label: 'API key',
                    value: 'ApiKeyAuthenticator',
                  },
                  {
                    label: 'Bearer token',
                    value: 'BearerAuthenticator',
                  },
                  {
                    label: 'Basic HTTP',
                    value: 'BasicHttpAuthenticator',
                  },
                  {
                    label: 'OAuth',
                    value: 'OAuthAuthenticator',
                  },
                ]}
              />
            </div>
          </Col>
          <Col span={24}>
            {methodTypeWatch === 'ApiKeyAuthenticator' && (
              <AppCard>
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
                        {
                          label: 'Body data',
                          value: 'body_data',
                        },
                        {
                          label: 'Body JSON payload',
                          value: 'body_json',
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
              </AppCard>
            )}
            {methodTypeWatch === 'BearerAuthenticator' && (
              <AppCard>
                <Row>
                  <Col span={24}>
                    <div className='d-flex items-center justify-start'>
                      <label>Bearer Token</label>
                      <Tooltip title='Mã token được đưa vào làm tiêu đề yêu cầu để xác thực với API.'>
                        <AntButton
                          style={{
                            border: 'none',
                            boxShadow: 'unset',
                            color: 'hsl(240, 13%, 72%)',
                          }}
                          shape='circle'
                          icon={<QuestionCircleOutlined />}
                        />
                      </Tooltip>
                    </div>
                  </Col>
                </Row>
              </AppCard>
            )}
            {methodTypeWatch === 'BasicHttpAuthenticator' && (
              <AppCard>
                <Row>
                  <Col span={24}>
                    <div className='d-flex items-center justify-start'>
                      <label>Tên tài khoản</label>
                      <Tooltip title='Tên tài khoản sẽ được kết hợp với mật khẩu, được mã hóa base64 và được sử dụng để thực hiện yêu cầu. Điền thông tin người dùng vào đầu vào người dùng.'>
                        <AntButton
                          style={{
                            border: 'none',
                            boxShadow: 'unset',
                            color: 'hsl(240, 13%, 72%)',
                          }}
                          shape='circle'
                          icon={<QuestionCircleOutlined />}
                        />
                      </Tooltip>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className='d-flex items-center justify-start'>
                      <label>Mật khẩu</label>
                      <Tooltip title='Mật khẩu sẽ được kết hợp với tên tài khoản, được mã hóa base64 và được sử dụng để thực hiện yêu cầu. Điền thông tin mật khẩu vào đầu vào người dùng.'>
                        <AntButton
                          style={{
                            border: 'none',
                            boxShadow: 'unset',
                            color: 'hsl(240, 13%, 72%)',
                          }}
                          shape='circle'
                          icon={<QuestionCircleOutlined />}
                        />
                      </Tooltip>
                    </div>
                  </Col>
                </Row>
              </AppCard>
            )}
            {methodTypeWatch === 'OAuthAuthenticator' && (
              <FormOAuthAuthenticator watchInputUser={watchInputUser} />
            )}
            {methodTypeWatch === 'SessionTokenAuthenticator' && (
              <FormSessionToken />
            )}
          </Col>
        </Row>
      </Col>

      {/* dau vao input user */}
      <Col span={24} className={clsx(style.wrapInputUser)}>
        <Collapse accordion expandIconPosition='end' defaultActiveKey='1'>
          <Panel header='Đầu vào của người dùng' key='1'>
            <Form.List name={'connection_specification'}>
              {(fields, operation) => {
                const { add, remove } = operation;
                refAddInputUser.current = add;
                return (
                  <>
                    {fields.map(({ key, name, ...restField }) => {
                      const valueUserCurrent = watchInputUser[name];
                      const isHiddenBtnDelete =
                        valueUserCurrent?.id === 'api_key' ||
                        valueUserCurrent?.id === 'username' ||
                        valueUserCurrent?.id === 'password' ||
                        valueUserCurrent?.id === 'client_id' ||
                        valueUserCurrent?.id === 'client_secret' ||
                        valueUserCurrent?.id === 'client_refresh_token';

                      return (
                        <Row
                          name={[name]}
                          key={key}
                          className={clsx(style.inputUserItem)}>
                          <Col span={22}>
                            <div
                              {...restField}
                              className='d-flex items-center justify-start gap-2'>
                              <IntlMessages
                                id={valueUserCurrent?.title_input_user}
                                maxLength={80}
                                style={{
                                  fontWeight: 500,
                                }}
                              />
                              <Tag
                                icon={<CheckCircleOutlined />}
                                color={isHiddenBtnDelete ? 'success' : 'gold'}>
                                {isHiddenBtnDelete
                                  ? 'Đầu vào sẵn có'
                                  : 'Đầu vào được thêm'}
                              </Tag>
                            </div>
                          </Col>
                          <Col span={1} className='d-flex justify-end'>
                            <AntButton
                              onClick={() => {
                                setNameInputUserItem(name);
                                setInitUpdateUser(valueUserCurrent);
                                setIsOpenAddInputUser(true);
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
                    })}
                    <Form.Item className='d-flex items-center justify-center mt-4'>
                      <AntButton
                        onClick={() => {
                          setInitUpdateUser(null);
                          setIsOpenAddInputUser(true);
                        }}
                        icon={<PlusOutlined />}>
                        Thêm mới
                      </AntButton>
                    </Form.Item>
                    <AntModal
                      key={`form_input_user_${isOpenAddInputUser}`}
                      bodyStyle={{ maxHeight: '75vh', overflow: 'auto' }}
                      centered
                      title={
                        initUpdateInputUser
                          ? 'Chỉnh sửa đầu vào người dùng'
                          : 'Đầu vào người dùng mới'
                      }
                      open={isOpenAddInputUser}
                      onOk={() => {
                        if (!isEmpty(refFormInputUser?.current)) {
                          refFormInputUser?.current.submit();
                        }
                      }}
                      okText={initUpdateInputUser ? 'Chỉnh sửa' : 'Thêm mới'}
                      onCancel={() => {
                        setIsOpenAddInputUser(false);
                      }}>
                      <FormContent
                        initialValues={
                          initUpdateInputUser ? initUpdateInputUser : {}
                        }
                        layout='vertical'
                        onFinish={(data) => {
                          if (isEmpty(initUpdateInputUser)) {
                            add(data);
                          } else {
                            const newDataUpdate = [...watchInputUser];
                            newDataUpdate[nameInputUserItem] = {
                              ...newDataUpdate[nameInputUserItem],
                              ...data,
                            };
                            form.setFieldValue(
                              'connection_specification',
                              newDataUpdate,
                            );
                          }
                          setIsOpenAddInputUser(false);
                        }}
                        ref={refFormInputUser}>
                        <FormInputUser
                          methodTypeWatch={methodTypeWatch}
                          initUpdateInputUser={initUpdateInputUser}
                        />
                      </FormContent>
                    </AntModal>
                  </>
                );
              }}
            </Form.List>
          </Panel>
        </Collapse>
      </Col>

      {/* luong streams */}
      <Col span={24}>
        <FormStreams rowData={rowData} initBuilderApi={initBuilderApi} />
      </Col>
    </Row>
  );
}

export default FormMethod;
