import React, { useState } from 'react';

import wrapperTableIntegrateData from 'src/HOC/wrapperTableIntegrateData';
import {
  DESTINATION_URL_PAGINATION_ID,
  DESTINATION_URL_PAGINATION_NAME,
  WORKSPACE_ID,
} from 'src/shared/constants/DataFixed';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { Col, Row, Typography } from 'antd';
import AntModal from 'src/@crema/component/AntModal';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { FormDataModalNonPaginated } from 'src/pages/FormGeneralIntegrate/FormDataModalNonPaginated';
import { FormDataModalPaginated } from 'src/pages/FormGeneralIntegrate/FormDataModalPaginated';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { stringify } from 'src/shared/utils/String';

const TYPE_MODAL = {
  URL_PAGE: 'url_page',
  URL_NONE_PAGE: 'url_none_page',
};

const IntegrateSourceDatabase = ({
  rowData,
  isModalNewOpen,
  setIsModalNewOpen,
  isModalDetailOpen,
  setIsModalDetailOpen,
  isModalEditOpen,
  setIsModalEditOpen,
}) => {
  const [type, setType] = useState(null);

  const getTitleModal = () => {
    if (isModalDetailOpen) return 'table.action.detail';
    if (type === TYPE_MODAL.URL_NONE_PAGE) {
      return 'Dữ liệu đích đến URL không phân trang';
    }
    if (type === TYPE_MODAL.URL_PAGE) {
      return 'Dữ liệu đích đến URL có phân trang';
    }
  };

  return (
    <>
      <FormRowDataTable
        key={rowData && `action-${rowData?.connection_id}`}
        visible={type || isModalDetailOpen || isModalEditOpen}
        onClose={() => {
          setType(null);
          setIsModalNewOpen(false);
          setIsModalDetailOpen(false);
          setIsModalEditOpen(false);
        }}
        buttonText='Xác thực'
        formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD_DESTINATION}
        method={METHOD_FETCH.POST}
        preSaveData={(data) => {
          if (!data.destination_definition_id) {
            data.destination_definition_id = DESTINATION_URL_PAGINATION_ID;
          }
          data.workspace_id = WORKSPACE_ID;

          const newDataUpdate = {
            ...data,
            connection_configuration: {
              http_method: data?.connection_configuration?.http_method,
              api_url: data?.connection_configuration?.api_url,
              credentials: data?.connection_configuration?.credentials,
            },
          };
          return newDataUpdate;
        }}
        beforeSave={(data) => {
          const dataCheckDestinationServer = {
            workspaceId: data?.workspace_id || WORKSPACE_ID,
            destinationDefinitionId: data.destination_definition_id,
            connectionConfiguration: data.connection_configuration,
          };
          const dataCheckUpdate = {
            connectionConfiguration: data.connection_configuration,
            name: data?.name,
            destinationId: data?.destination_id,
          };
          return instanceCoreApi.post(API.CHECK_CONNECTION_AIR_BYTE, {
            api: rowData
              ? '/v1/destinations/check_connection_for_update'
              : '/v1/scheduler/destinations/check_connection',
            body: rowData
              ? stringify(dataCheckUpdate)
              : stringify(dataCheckDestinationServer),
          });
        }}
        resource={
          rowData
            ? API.UPDATE_DESTINATION_AIR_BYTE
            : API.CREATE_DESTINATION_AIR_BYTE
        }
        readOnly={isModalDetailOpen}
        title={getTitleModal()}
        initialValues={rowData ? rowData : {}}>
        {(type === TYPE_MODAL.URL_NONE_PAGE || !type) && (
          <FormDataModalNonPaginated />
        )}
        {type === TYPE_MODAL.URL_PAGE && <FormDataModalPaginated />}
      </FormRowDataTable>
      <AntModal
        okButtonProps={{ hidden: 'true' }}
        size={MODAL_SIZE.MEDIUM}
        title='Chọn loại dữ liệu đích bạn muốn kết nối'
        open={isModalNewOpen}
        onCancel={() => setIsModalNewOpen(false)}>
        <Row gutter={[20, 16]}>
          <Col span={24} className={'text-center'}>
            <button
              style={{ cursor: 'pointer', width: 200, height: 60 }}
              onClick={() => {
                setType(TYPE_MODAL.URL_PAGE);
                setIsModalNewOpen(false);
              }}>
              <Typography.Text>URL phân trang</Typography.Text>
            </button>
          </Col>
          <Col span={24} className={'text-center'}>
            <button
              style={{ cursor: 'pointer', width: 200, height: 60 }}
              onClick={() => {
                setType(TYPE_MODAL.URL_NONE_PAGE);
                setIsModalNewOpen(false);
              }}>
              <Typography.Text>URL không phân trang</Typography.Text>
            </button>
          </Col>
        </Row>
      </AntModal>
    </>
  );
};
export default wrapperTableIntegrateData(IntegrateSourceDatabase, {
  types: [DESTINATION_URL_PAGINATION_NAME],
});
