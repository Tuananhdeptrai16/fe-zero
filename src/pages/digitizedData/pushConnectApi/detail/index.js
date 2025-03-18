import React, { useState } from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { useIntl } from 'react-intl';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import AppCard from 'src/@crema/core/AppCard';
import { FormDetailApi } from 'src/pageComponents/digitizedData/FormDetailApi';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { useParams } from 'react-router-dom';
import { Divider } from 'antd';
import { TABLE_ACTION } from 'src/shared/constants/TableAction';
import { TableTransformDigitizedData } from 'src/pageComponents/digitizedData/TableTransformDigitizedData';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';
import {
  activatePushData,
  addPushData,
  deactivatePushData,
  deletePushData,
  updatePushData,
} from 'src/@crema/services/digitizedData.service';
import ConfirmInfo from 'src/pageComponents/AdminUser/ConfirmInfo';
import { FormTransformDigitizedDataModal } from 'src/pageComponents/digitizedData/FormTransformDigitizedDataModal';

const DetailPushConnectApiPage = () => {
  const { messages } = useIntl();
  const { id } = useParams();
  const { data, isLoading } = useFetch({
    url: API.GET_PUSH_CONNECT_API(id),
  });
  const [rowData, setRowData] = useState(null);

  const preAddPushData = (data) => {
    return { ...data, push_connection_id: id };
  };

  const preUpdatePushData = (data) => {
    return {
      id: rowData?.id,
      data: {
        ...data,
        push_connection_id: id,
      },
    };
  };

  const actionContent = {
    [TABLE_ACTION.CREATE]: {
      title: 'form.formTitleAdd',
      success: 'form.addSuccessMessage',
      textButtonConfirm: 'form.buttonAdd',
      preSaveData: preAddPushData,
      action: addPushData,
      children: <FormTransformDigitizedDataModal isPushData />,
    },
    [TABLE_ACTION.UPDATE]: {
      title: 'form.formTitleUpdate',
      success: 'form.updateSuccessMessage',
      textButtonConfirm: 'form.buttonUpdate',
      initialValues: rowData,
      preSaveData: preUpdatePushData,
      action: updatePushData,
      children: <FormTransformDigitizedDataModal isPushData />,
    },
    [TABLE_ACTION.ACTIVATE]: {
      title: 'confirm.activatePushApiTitle',
      success: 'confirm.activateSuccess',
      action: () => activatePushData(rowData?.id),
      children: (
        <ConfirmInfo
          message={'confirm.activatePushApiSure'}
          name={rowData?.name}
        />
      ),
    },
    [TABLE_ACTION.DEACTIVATE]: {
      title: 'confirm.deactivatePushApiTitle',
      success: 'confirm.deactivateSuccess',
      action: () => deactivatePushData(rowData?.id),
      children: (
        <ConfirmInfo
          message={'confirm.deactivatePushApiSure'}
          name={rowData?.name}
        />
      ),
    },
    [TABLE_ACTION.DELETE]: {
      title: 'confirm.deleteApiTitle',
      success: 'confirm.deleteApiSuccess',
      action: () => deletePushData(rowData?.id),
      children: (
        <ConfirmInfo message={'confirm.deleteApiSure'} name={rowData?.name} />
      ),
    },
  };
  return (
    <>
      <AppPageMetadata title={messages['breadcrumb.detailPushApi']} />
      <SubHeaderApp>
        <SubHeaderAppTemplate
          isShowGoBack
          title={messages['breadcrumb.detailPushApi']}
        />
      </SubHeaderApp>
      <AppCard>
        <FormDetailApi
          title={messages['digitizedData.pushConnectApiInfo']}
          isLoading={isLoading}
          initialValues={data?.result ?? {}}
          isPushData
        />
        <Divider />
        <TableTransformDigitizedData
          apiUrl={API.SEARCH_PUSH_DATA}
          actionContent={actionContent}
          titleTable={messages['digitizedData.pushDataListTitle']}
          initTable={{
            filters: [
              {
                name: 'push_connection_id',
                operation: FILTER_OPERATION.EQ,
                value: id,
              },
            ],
          }}
          rowData={rowData}
          setRowData={setRowData}
        />
      </AppCard>
    </>
  );
};

export default DetailPushConnectApiPage;
