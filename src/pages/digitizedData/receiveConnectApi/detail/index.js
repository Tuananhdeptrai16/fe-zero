import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { TABLE_ACTION } from 'src/shared/constants/TableAction';
import {
  activateReceiveData,
  addReceiveData,
  deactivateReceiveData,
  deleteReceiveData,
  updateReceiveData,
} from 'src/@crema/services/digitizedData.service';
import { FormTransformDigitizedDataModal } from 'src/pageComponents/digitizedData/FormTransformDigitizedDataModal';
import ConfirmInfo from 'src/pageComponents/AdminUser/ConfirmInfo';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import AppCard from 'src/@crema/core/AppCard';
import { FormDetailApi } from 'src/pageComponents/digitizedData/FormDetailApi';
import { Divider } from 'antd';
import { TableTransformDigitizedData } from 'src/pageComponents/digitizedData/TableTransformDigitizedData';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';

const DetailReceiveConnectApiPage = () => {
  const { messages } = useIntl();
  const { id } = useParams();
  const { data, isLoading } = useFetch({
    url: API.GET_API_RECEIVE(id),
  });
  const [rowData, setRowData] = useState(null);

  const preAddReceiveData = (data) => {
    return { ...data, receive_connection_id: id, type: 'ocr_bulk_extract' };
  };

  const prevUpdateReceiveData = (data) => {
    return {
      id: rowData?.id,
      data: {
        ...data,
        receive_connection_id: id,
      },
    };
  };

  const actionContent = {
    [TABLE_ACTION.CREATE]: {
      title: 'form.formTitleAdd',
      success: 'form.addSuccessMessage',
      textButtonConfirm: 'form.buttonAdd',
      preSaveData: preAddReceiveData,
      action: addReceiveData,
      children: <FormTransformDigitizedDataModal />,
    },
    [TABLE_ACTION.UPDATE]: {
      title: 'form.formTitleUpdate',
      success: 'form.updateSuccessMessage',
      textButtonConfirm: 'form.buttonUpdate',
      initialValues: rowData,
      preSaveData: prevUpdateReceiveData,
      action: updateReceiveData,
      children: <FormTransformDigitizedDataModal />,
    },
    [TABLE_ACTION.ACTIVATE]: {
      title: 'confirm.activateReceiveDataApiTitle',
      success: 'confirm.activateSuccess',
      action: () => activateReceiveData(rowData?.id),
      children: (
        <ConfirmInfo
          message={'confirm.activateReceiveDataApiSure'}
          name={rowData?.name}
        />
      ),
    },
    [TABLE_ACTION.DEACTIVATE]: {
      title: 'confirm.deactivateReceiveDataApiTitle',
      success: 'confirm.deactivateSuccess',
      action: () => deactivateReceiveData(rowData?.id),
      children: (
        <ConfirmInfo
          message={'confirm.deactivateReceiveDataApiSure'}
          name={rowData?.name}
        />
      ),
    },
    [TABLE_ACTION.DELETE]: {
      title: 'confirm.deleteApiTitle',
      success: 'confirm.deleteApiSuccess',
      action: () => deleteReceiveData(rowData?.id),
      children: (
        <ConfirmInfo message={'confirm.deleteApiSure'} name={rowData?.name} />
      ),
    },
  };
  return (
    <>
      <AppPageMetadata title={messages['breadcrumb.detailReceiveData']} />
      <SubHeaderApp>
        <SubHeaderAppTemplate
          isShowGoBack
          title={messages['breadcrumb.detailReceiveData']}
        />
      </SubHeaderApp>
      <AppCard>
        <FormDetailApi
          title={messages['digitizedData.receiveConnectApiInfo']}
          isLoading={isLoading}
          initialValues={data?.result ?? {}}
        />
        <Divider />
        <TableTransformDigitizedData
          apiUrl={API.SEARCH_RECEIVE_DATA}
          actionContent={actionContent}
          titleTable={messages['digitizedData.receiveDataListTitle']}
          initTable={{
            filters: [
              {
                name: 'receive_connection_id',
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

export default DetailReceiveConnectApiPage;
