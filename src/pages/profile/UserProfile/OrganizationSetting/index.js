import React from 'react';
import { Button, Divider, Form, Spin, Typography } from 'antd';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';
import FormContent from 'src/@crema/component/FormContent';
import { FormHorizontalOrganization } from 'src/pages/profile/UserProfile/OrganizationSetting/FormHozontialOrganization';
import useCallApi from 'src/@crema/hook/useCallApi';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { renderErrorNotification } from 'src/shared/utils/Service';
import { useIntl } from 'react-intl';

export const OrganizationSetting = () => {
  const { user } = useAuthUser();
  const [form] = Form.useForm();
  const { messages } = useIntl();

  const { data: userOrganizationRes, isLoading } = useFetch({
    url: API.SELECT_ORGANIZATION,
    method: METHOD_FETCH.POST,
    body: {
      filters: [
        {
          name: 'id',
          value: user?.organization_id,
          operation: FILTER_OPERATION.EQ,
        },
      ],
      pageable: {},
    },
  });
  const userOrganization = userOrganizationRes?.result?.items?.[0];

  const { send, loading } = useCallApi({
    callApi: (data) =>
      instanceCoreApi.put(API.UPDATE_ORGANIZATION(user?.organization_id), data),
    error: (err) => {
      renderErrorNotification(err, form);
    },
  });

  const onUpdateOrganization = async (data) => {
    await send(data);
  };

  return (
    <div>
      <Typography.Title level={4}>
        {messages['userProfile.organization']}
      </Typography.Title>
      <Divider />
      <Spin spinning={isLoading}>
        <FormContent
          labelAlign={'left'}
          onFinish={onUpdateOrganization}
          labelCol={{ span: 10 }}
          key={userOrganization?.id}
          initialValues={userOrganization}
          form={form}>
          <FormHorizontalOrganization />
          <Divider />
          <Form.Item className='user-profile-group-btn'>
            <Button type='primary' htmlType='submit' loading={loading}>
              Cập nhật
            </Button>
          </Form.Item>
        </FormContent>
      </Spin>
    </div>
  );
};
