import React from 'react';
import wrapperTableIntegrateData from 'src/HOC/wrapperTableIntegrateData';
import {
  DESTINATION_POSTGRES_ID,
  SOURCE_DEFINITION_POSTGRES_TYPE,
  WORKSPACE_ID,
} from 'src/shared/constants/DataFixed';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import { FormDataModalPostgres } from 'src/pages/FormGeneralIntegrate/FormDataModalPostgres';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { stringify } from 'src/shared/utils/String';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { decryptObject, encryptData } from 'src/shared/utils/Object';
import { REACT_APP_SECRET_KEY } from 'src/shared/constants/serverConfig';
// import { isEmpty } from 'src/shared/utils/Typeof';

const IntegrateDatabasePage = ({
  rowData,
  isModalNewOpen,
  setIsModalNewOpen,
  isModalDetailOpen,
  setIsModalDetailOpen,
  isModalEditOpen,
  setIsModalEditOpen,
  category,
}) => {
  const getTitleModal = () => {
    switch (true) {
      case isModalEditOpen:
        return 'table.action.edit';
      case isModalDetailOpen:
        return 'table.action.detail';
      case isModalNewOpen:
        return 'table.action.add';
      default:
        return '';
    }
  };
  return (
    <>
      <FormRowDataTable
        disabled={rowData?.connection_mapping ? true : false}
        key={rowData && `action-${rowData?.connection_id}`}
        size={MODAL_SIZE.LARGE}
        visible={isModalNewOpen || isModalEditOpen || isModalDetailOpen}
        onClose={() => {
          setIsModalNewOpen(false);
          setIsModalDetailOpen(false);
          setIsModalEditOpen(false);
        }}
        formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD_DESTINATION}
        method={METHOD_FETCH.POST}
        preSaveData={async (data) => {
          data.destination_definition_id = DESTINATION_POSTGRES_ID;
          if (category) {
            data.category = category;
          }
          data.connection_configuration.type = 'local';
          data.connection_configuration.database_type =
            SOURCE_DEFINITION_POSTGRES_TYPE;

          const payloadData = await encryptData(data);
          return { data: payloadData };
          // return data;
        }}
        beforeSave={async (data) => {
          const dataDecrypt = await data.then(async (res) => {
            const decrypt = await decryptObject(res.data, REACT_APP_SECRET_KEY);
            return decrypt;
          });
          const dataCheckDestinationServer = {
            workspaceId: WORKSPACE_ID,
            destinationDefinitionId: dataDecrypt.destination_definition_id,
            connectionConfiguration: dataDecrypt.connection_configuration,
          };
          const dataCheckUpdate = {
            connectionConfiguration: dataDecrypt.connection_configuration,
            name: dataDecrypt?.name,
            destinationId: dataDecrypt?.id,
          };

          const encryptDataCheckDestination = await encryptData({
            api: '/v1/scheduler/destinations/check_connection',
            body: stringify(dataCheckDestinationServer),
          });
          const encryptDataCheckUpdate = await encryptData({
            api: '/v1/destinations/check_connection_for_update',
            body: stringify(dataCheckUpdate),
          });

          return instanceCoreApi.post(
            API.CHECK_CONNECTION_AIR_BYTE,
            rowData
              ? { data: encryptDataCheckUpdate }
              : { data: encryptDataCheckDestination },
          );
        }}
        resource={
          rowData
            ? API.UPDATE_DESTINATION_AIR_BYTE
            : API.CREATE_DESTINATION_AIR_BYTE
        }
        readOnly={isModalDetailOpen}
        title={getTitleModal()}
        initialValues={rowData ? rowData : {}}>
        <FormDataModalPostgres isDetail={isModalDetailOpen} />
      </FormRowDataTable>
    </>
  );
};
export default wrapperTableIntegrateData(IntegrateDatabasePage, {
  title: 'message.deleteDestinationData',
  success: 'message.deleteDestinationDataSuccess',
  confirm: 'message.deleteDestinationDataSure',
  itemName: 'display_name',
});
