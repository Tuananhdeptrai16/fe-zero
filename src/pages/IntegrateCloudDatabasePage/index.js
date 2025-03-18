import React, { useState } from 'react';

import wrapperTableIntegrateData from 'src/HOC/wrapperTableIntegrateData';
import {
  DESTINATION_MSSQL_ID,
  DESTINATION_MSSQL_NAME,
  DESTINATION_MYSQL_ID,
  DESTINATION_MYSQL_NAME,
  DESTINATION_POSTGRES_ID,
  DESTINATION_POSTGRES_NAME,
  WORKSPACE_ID,
} from 'src/shared/constants/DataFixed';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { Col, Row } from 'antd';
import MySQL from 'src/assets/image/MySQL.png';
import MSSQL from 'src/assets/image/MSSQL.png';
import Postgres from 'src/assets/image/Postgres.png';
import AntModal from 'src/@crema/component/AntModal';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import { FormDataModalMySQL } from 'src/pages/FormGeneralIntegrate/FormDataModalMySQL';
import { FormDataModalMSSQL } from 'src/pages/FormGeneralIntegrate/FormDataModalMSSQL';
import { FormDataModalPostgres } from 'src/pages/FormGeneralIntegrate/FormDataModalPostgres';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { stringify } from 'src/shared/utils/String';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import ButtonSelectSource from 'src/@crema/component/ButtonSelectSource/ButtonSelectSource';

const IntegrateCloudDatabasePage = ({
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
    if (idSource) {
      switch (idSource) {
        case DESTINATION_MSSQL_ID:
          return 'Dữ liệu đích đến MSSQL';
        case DESTINATION_MYSQL_ID:
          return 'Dữ liệu đích đến MYSQL';
        case DESTINATION_POSTGRES_ID:
          return 'Dữ liệu đích đến Postgres';
      }
    }
  };
  return (
    <>
      <FormRowDataTable
        key={rowData && `action-${rowData?.connection_id}`}
        size={MODAL_SIZE.LARGE}
        visible={idSource || isModalDetailOpen || isModalEditOpen}
        onClose={() => {
          setIdSource(null);
          setIsModalNewOpen(false);
          setIsModalDetailOpen(false);
          setIsModalEditOpen(false);
        }}
        formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD_DESTINATION}
        method={METHOD_FETCH.POST}
        preSaveData={(data) => {
          if (idSource) {
            data.destination_definition_id = idSource;
          }
          data.connection_configuration.type = 'cloud';

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
        {(rowData?.destination_definition_id === DESTINATION_MYSQL_ID ||
          idSource === DESTINATION_MYSQL_ID) && <FormDataModalMySQL />}
        {(rowData?.destination_definition_id === DESTINATION_MSSQL_ID ||
          idSource === DESTINATION_MSSQL_ID) && <FormDataModalMSSQL />}
        {(rowData?.destination_definition_id === DESTINATION_POSTGRES_ID ||
          idSource === DESTINATION_POSTGRES_ID) && <FormDataModalPostgres />}
      </FormRowDataTable>
      <AntModal
        okButtonProps={{ hidden: 'true' }}
        size={MODAL_SIZE.XLARGE}
        title='Chọn loại dữ liệu đích bạn muốn kết nối'
        open={isModalNewOpen}
        onCancel={() => setIsModalNewOpen(false)}>
        <Row gutter={[10, 16]}>
          <Col span={8}>
            <ButtonSelectSource
              sourceImg={MSSQL}
              onClick={() => {
                setIdSource(DESTINATION_MSSQL_ID);
                setIsModalNewOpen(false);
              }}
              alt={'MSSQL'}
              title={'Microsoft SQL Server (MSSQL)'}
            />
          </Col>
          <Col span={8}>
            <ButtonSelectSource
              sourceImg={Postgres}
              onClick={() => {
                setIdSource(DESTINATION_POSTGRES_ID);
                setIsModalNewOpen(false);
              }}
              alt={'Postgres'}
              title={'PostgreSQL'}
            />
          </Col>{' '}
          <Col span={8}>
            <ButtonSelectSource
              onClick={() => {
                setIdSource(DESTINATION_MYSQL_ID);
                setIsModalNewOpen(false);
              }}
              sourceImg={MySQL}
              alt={'MySQL'}
              title={'MySQL'}
            />
          </Col>
        </Row>
      </AntModal>
    </>
  );
};
export default wrapperTableIntegrateData(IntegrateCloudDatabasePage, {
  types: [
    DESTINATION_MYSQL_NAME,
    DESTINATION_MSSQL_NAME,
    DESTINATION_POSTGRES_NAME,
  ],
  connection_configuration_type: 'cloud',
});
