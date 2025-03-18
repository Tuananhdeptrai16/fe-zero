import React from 'react';
import wrapperTableIntegrateData from 'src/HOC/wrapperTableIntegrateData';
import {
  DESTINATION_SFTP_NAME,
  DESTINATION_SFTP_ID,
  WORKSPACE_ID,
} from 'src/shared/constants/DataFixed';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { FormDataModalSFTP } from 'src/pages/FormGeneralIntegrate/FormDataModalSFTP';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { stringify } from 'src/shared/utils/String';

const FTPConnectionPage = ({
  rowData,
  isModalNewOpen,
  setIsModalNewOpen,
  isModalDetailOpen,
  setIsModalDetailOpen,
  isModalEditOpen,
  setIsModalEditOpen,
}) => {
  const getTitleModal = () => {
    if (isModalDetailOpen) return 'table.action.detail';
    return 'Dữ liệu đích đến FTP';
  };

  return (
    <FormRowDataTable
      key={rowData && `action-${rowData?.connection_id}`}
      size={MODAL_SIZE.MEDIUM}
      visible={isModalNewOpen || isModalDetailOpen || isModalEditOpen}
      onClose={() => {
        setIsModalNewOpen(false);
        setIsModalDetailOpen(false);
        setIsModalEditOpen(false);
      }}
      formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD_DESTINATION}
      method={METHOD_FETCH.POST}
      preSaveData={(data) => {
        if (isModalNewOpen) {
          data.destination_definition_id = DESTINATION_SFTP_ID;
        }
        return data;
      }}
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
      resource={
        rowData
          ? API.UPDATE_DESTINATION_AIR_BYTE
          : API.CREATE_DESTINATION_AIR_BYTE
      }
      readOnly={isModalDetailOpen}
      title={getTitleModal()}
      initialValues={rowData ? rowData : {}}>
      <FormDataModalSFTP />
    </FormRowDataTable>
  );
};

export default wrapperTableIntegrateData(FTPConnectionPage, {
  types: [DESTINATION_SFTP_NAME],
});
