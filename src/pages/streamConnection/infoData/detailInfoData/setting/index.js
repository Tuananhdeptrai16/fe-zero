import React, { useState } from 'react';
import FormContent from 'src/@crema/component/FormContent';
import AppCard from 'src/@crema/core/AppCard';
import { Typography, Button, Col } from 'antd';
import useCallApi from 'src/@crema/hook/useCallApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import API from 'src/@crema/services/apis';
import {
  convertDataConnectionUpdate,
  encryptObject,
} from 'src/shared/utils/Object';
import { FormInfoDataModal } from 'src/pages/streamConnection/FormInfoDataModal';

import notification from 'src/shared/utils/notification';
import AntButton from 'src/@crema/component/AntButton';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import routes from 'src/config/routes.config';
import { useJWTAuthActions } from 'src/@crema/services/auth/jwt-auth/JWTAuthProvider';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import { REACT_APP_SECRET_KEY } from 'src/shared/constants/serverConfig';

const Setting = ({ data, pageName }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { checkPermissionAction } = useJWTAuthActions();

  const canGoBack = location.key !== 'default';
  const handleGoBack = () => {
    navigate(-1);
  };

  const isPermissionUpdate = checkPermissionAction(
    pageName,
    ITEM_PERMISSIONS.UPDATE,
  );

  const isPermissionDelete = checkPermissionAction(
    pageName,
    ITEM_PERMISSIONS.DELETE,
  );

  const initialValues = {
    ...data,
    replication_frequency: data?.schedule_data?.basic_schedule?.units,
    cron_expression: data?.schedule_data?.cron?.cron_expression,
    source: {
      ...data?.source,
      display_name: data?.source?.name,
      airbyte_source_id: data?.source?.source_id,
    },
    destination: {
      ...data?.destination,
      display_name: data?.destination?.name,
      id: data?.destination?.destination_id,
    },
  };

  const sourceName = data?.source?.source_name;
  const navigateLink = () => {
    return -1;
    // if (data === SOURCE_DEFINITION_MSSQL_NAME) {
    //   return routes.listConnectionMSSQL;
    // } else if (data === SOURCE_DEFINITION_POSTGRES_NAME) {
    //   return routes.listConnectionPostgreSQL;
    // } else if (data === SOURCE_DEFINITION_MYSQL_NAME) {
    //   return routes.listConnectionMySQL;
    // } else if (data === SOURCE_DEFINITION_ORACLE_NAME) {
    //   return routes.listConnectionOracle;
    // } else if (data === SOURCE_DEFINITION_API_NAME) {
    //   return routes.listConnectionAPI;
    // } else if (data === SOURCE_DEFINITION_FILE_NAME) {
    //   return routes.listConnectionFile;
    // } else {
    //   return -1;
    // }
  };

  const { send: updateProgress, loading: loadingUpdateProgress } = useCallApi({
    success: () => {
      notification.success('Cập nhật thông tin thành công');
      setTimeout(() => {
        navigate(navigateLink(sourceName));
      }, 1000);
    },
    callApi: (data) => {
      const encryptData = encryptObject(data, REACT_APP_SECRET_KEY);
      return instanceCoreApi.post(API.UPDATE_CONNECTION_AIR_BYTE, {
        data: encryptData,
      });
    },
  });

  return (
    <>
      <AppCard className='mb-6'>
        {/* <Title level={3} className={'mb-6'}>
          Thông tin tiến trình
        </Title> */}
        <FormContent
          initialValues={initialValues}
          onFinish={(dataUpdate) => {
            dataUpdate = convertDataConnectionUpdate(
              dataUpdate,
              data?.connection_id,
              data?.sync_catalog?.streams,
            );
            return updateProgress(dataUpdate);
          }}
          labelCol={{
            sm: { span: 4 },
          }}
          labelAlign='left'
          wrapperCol={{
            sm: { span: 12 },
          }}>
          <FormInfoDataModal isUpdate={true} sourceName={sourceName} />
          <div>
            <Button
              loading={loadingUpdateProgress}
              htmlType='submit'
              type='primary'
              disabled={!isPermissionUpdate}>
              Cập nhật
            </Button>
          </div>
        </FormContent>
      </AppCard>
      <AppCard>
        <Col span={24}>
          <Typography.Title style={{ marginBottom: '1rem' }} level={2}>
            Xóa tiến trình
          </Typography.Title>
          <Typography.Text style={{ margin: '1rem 0' }}>
            Không có dữ liệu nào sẽ bị xóa khỏi nguồn và đích của bạn. Không thể
            hoàn tác thao tác này nếu không đồng bộ lại đầy đủ.
          </Typography.Text>
          <Col style={{ margin: '1rem 0' }}>
            <AntButton
              disabled={!isPermissionDelete}
              type='texts'
              onClick={() => {
                setIsDialogOpen(true);
              }}>
              Xóa tiến trình
            </AntButton>
          </Col>
        </Col>
      </AppCard>
      <DialogConfirm
        key={data?.source_id + 'delete'}
        visible={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        textTitle={'confirm.deleteProgress'}
        onSuccess={() =>
          canGoBack ? handleGoBack() : navigate(routes.workspace)
        }
        textSuccess={'confirm.deleteProgressSuccess'}
        onSaveToServer={() =>
          instanceCoreApi.post(API.DELETE_CONNECTION_AIR_BYTE, {
            connection_id: data?.connection_id,
          })
        }>
        <p>
          <IntlMessages id='confirm.deleteProgressSure' />
          <span className='warning-text-color'>{data?.name}</span>
        </p>
      </DialogConfirm>
    </>
  );
};

export default Setting;
