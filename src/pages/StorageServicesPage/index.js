import React, { useState } from 'react';
import wrapperTableIntegrateData from 'src/HOC/wrapperTableIntegrateData';
import {
  DESTINATION_GOOGLE_SHEET_ID,
  DESTINATION_GOOGLE_SHEET_NAME,
  WORKSPACE_ID,
} from 'src/shared/constants/DataFixed';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { FormDataModalGoogleSheet } from 'src/pages/FormGeneralIntegrate/FormDataModalGoogleSheet';
import { Col, Row } from 'antd';
import GoogleDrive from 'src/assets/image/GoogleDrive.png';
import AntModal from 'src/@crema/component/AntModal';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { stringify } from 'src/shared/utils/String';

const StorageServicesPage = ({
  rowData,
  isModalNewOpen,
  setIsModalNewOpen,
  isModalDetailOpen,
  setIsModalDetailOpen,
  isModalEditOpen,
  setIsModalEditOpen,
}) => {
  const [idSource, setIdSource] = useState(null);

  const getTitleModal = () => {
    if (isModalDetailOpen) return 'table.action.detail';
    return 'Dữ liệu đích đến dịch vụ lưu trữ đám mây';
  };

  return (
    <>
      <FormRowDataTable
        key={rowData && `action-${rowData?.connection_id}`}
        size={MODAL_SIZE.MEDIUM}
        visible={idSource || isModalDetailOpen || isModalEditOpen}
        onClose={() => {
          setIdSource(null);
          setIsModalNewOpen(false);
          setIsModalDetailOpen(false);
          setIsModalEditOpen(false);
        }}
        formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD_DESTINATION}
        method={METHOD_FETCH.POST}
        beforeSave={(data) => {
          const dataCheckDestinationServer = {
            workspaceId: WORKSPACE_ID,
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
        preSaveData={(data) => {
          if (idSource) {
            data.destination_definition_id = idSource;
          }

          return data;
        }}
        resource={
          rowData
            ? API.UPDATE_DESTINATION_AIR_BYTE
            : API.CREATE_DESTINATION_AIR_BYTE
        }
        readOnly={isModalDetailOpen}
        title={getTitleModal()}
        initialValues={rowData ? rowData : {}}>
        <FormDataModalGoogleSheet />
      </FormRowDataTable>
      <AntModal
        okButtonProps={{ hidden: 'true' }}
        size={MODAL_SIZE.MEDIUM}
        title='Chọn loại dữ liệu đích bạn muốn kết nối'
        open={isModalNewOpen}
        onCancel={() => setIsModalNewOpen(false)}>
        <Row style={{ marginLeft: '20px' }}>
          <Col span={8}></Col>
          <Col span={8}>
            <button
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setIdSource(DESTINATION_GOOGLE_SHEET_ID);
                setIsModalNewOpen(false);
              }}>
              <img
                src={GoogleDrive}
                style={{ width: '200px', height: '60px' }}
                alt='MySQL'
              />
            </button>
          </Col>
        </Row>
      </AntModal>
    </>
  );
};

export default wrapperTableIntegrateData(StorageServicesPage, {
  types: [DESTINATION_GOOGLE_SHEET_NAME],
});
