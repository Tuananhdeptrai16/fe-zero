import React, { useState } from 'react';
import {
  SOURCE_DEFINITION_API_ID,
  SOURCE_DEFINITION_FILE_ID,
  SOURCE_DEFINITION_MSSQL_ID,
  SOURCE_DEFINITION_MSSQL_TYPE,
  SOURCE_DEFINITION_MYSQL_ID,
  SOURCE_DEFINITION_MYSQL_TYPE,
  SOURCE_DEFINITION_ORACLE_ID,
  SOURCE_DEFINITION_ORACLE_TYPE,
  SOURCE_DEFINITION_POSTGRES_ID,
  SOURCE_DEFINITION_POSTGRES_TYPE,
  WORKSPACE_ID,
} from 'src/shared/constants/DataFixed';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { Col, Row } from 'antd';
import MySQL from 'src/assets/image/MySQL.png';
import MSSQL from 'src/assets/image/MSSQL.png';
import Postgres from 'src/assets/image/Postgres.png';
import APIImageSource from 'src/assets/image/API.png';
import Oracle from 'src/assets/image/Oracle.png';
import File from 'src/assets/image/File.png';
import AntModal from 'src/@crema/component/AntModal';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import wrapperTableInterSource from 'src/HOC/wrapperTableInterSource';
import { FormSourceMSSQL } from '../sourceMSSQL/FormSourceMSSQL';
import { FormSourceMySQL } from '../sourceMySQL/FormSourceMySQL';
import { FormSourcePostgres } from '../sourcePostgreSQL/FormSourcePostgres';
import { stringify } from 'src/shared/utils/String';
import { isArray, isEmpty } from 'src/shared/utils/Typeof';
import { FormSourceOracle } from '../sourceOracle/FormSourceOracle';
import { FormSourceDataAPIModal } from '../sourceAPI/FormSourceDataAPIModal';
import ButtonSelectSource from 'src/@crema/component/ButtonSelectSource/ButtonSelectSource';
import { FormSourceDataModal } from '../sourceData/FormSourceDataModal';
import { decryptObject, encryptData } from 'src/shared/utils/Object';
import { REACT_APP_SECRET_KEY } from 'src/shared/constants/serverConfig';

const FORM_CONTENT = {
  [SOURCE_DEFINITION_MSSQL_ID]: {
    title: 'Thêm mới nguồn dữ liệu MSSQL',
    titleUpdate: 'Chỉnh sửa nguồn dữ liệu MSSQL',
    component: FormSourceMSSQL,
  },
  [SOURCE_DEFINITION_MYSQL_ID]: {
    title: 'Thêm mới nguồn dữ liệu MYSQL',
    titleUpdate: 'Chỉnh sửa nguồn dữ liệu MYSQL',
    component: FormSourceMySQL,
  },
  [SOURCE_DEFINITION_POSTGRES_ID]: {
    title: 'Thêm mới nguồn dữ liệu Postgres',
    titleUpdate: 'Chỉnh sửa nguồn dữ liệu Postgres',
    component: FormSourcePostgres,
  },
  [SOURCE_DEFINITION_ORACLE_ID]: {
    title: 'Thêm mới nguồn dữ liệu Oracle',
    titleUpdate: 'Chỉnh sửa nguồn dữ liệu Oracle',
    component: FormSourceOracle,
  },
  [SOURCE_DEFINITION_FILE_ID]: {
    title: 'Thêm mới nguồn dữ liệu theo File',
    titleUpdate: 'Chỉnh sửa nguồn dữ liệu theo File',
    component: FormSourceDataModal,
  },
  [SOURCE_DEFINITION_API_ID]: {
    title: 'Thêm mới nguồn dữ liệu API',
    titleUpdate: 'Chỉnh sửa nguồn dữ liệu API',
    component: FormSourceDataAPIModal,
  },
};

const IntegrateSourceDatabasePage = ({
  rowData,
  isModalNewOpen,
  setIsModalNewOpen,
  isModalDetailOpen,
  setIsModalDetailOpen,
  isModalEditOpen,
  setIsModalEditOpen,
  category,
}) => {
  const [idSource, setIdSource] = useState(null);
  const [sourceType, setSourceType] = useState(null);
  const source_definition_id_check = rowData?.source_definition_id || idSource;

  const titleModal =
    FORM_CONTENT[source_definition_id_check]?.title ||
    'Thêm mới nguồn dữ liệu API';

  const titleModalUpdate =
    FORM_CONTENT[source_definition_id_check]?.titleUpdate ||
    'Chỉnh sửa nguồn dữ liệu API';

  const ComponentModal =
    FORM_CONTENT[source_definition_id_check]?.component ||
    FormSourceDataAPIModal;

  return (
    <>
      <FormRowDataTable
        key={rowData && `action-${rowData?.airbyte_source_id}`}
        size={
          ComponentModal === FormSourceDataAPIModal
            ? MODAL_SIZE.MEDIUM
            : MODAL_SIZE.LARGE
        }
        visible={
          Boolean(idSource) ||
          Boolean(isModalDetailOpen) ||
          Boolean(isModalEditOpen)
        }
        onClose={() => {
          setIdSource(null);
          setSourceType(null);
          setIsModalNewOpen(false);
          setIsModalDetailOpen(false);
          setIsModalEditOpen(false);
        }}
        formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
        method={METHOD_FETCH.POST}
        preSaveData={async (data) => {
          if (!data.source_definition_id) {
            data.source_definition_id = idSource;
          }
          if (!isEmpty(category)) {
            data.category = category;
          }
          if (isEmpty(data?.connection_configuration)) {
            data.connection_configuration = {};
          }
          if (sourceType) {
            data.connection_configuration = {
              ...data.connection_configuration,
              database_type: sourceType,
            };
          }
          if (!isArray(data?.connection_configuration?.schemas)) {
            data.connection_configuration.schemas =
              data?.connection_configuration?.schemas?.split();
          }
          const payloadData = await encryptData(data);
          return { data: payloadData };
          // console.log(data);
          // return data;
        }}
        beforeSave={async (data) => {
          const dataDecrypt = await data.then(async (res) => {
            const decrypt = await decryptObject(res.data, REACT_APP_SECRET_KEY);
            return decrypt;
          });
          const dataCheckConnectionServer = {
            connectionConfiguration:
              dataDecrypt?.connection_configuration || {},
            sourceDefinitionId:
              dataDecrypt?.source_definition_id || source_definition_id_check,
            workspaceId: WORKSPACE_ID,
          };

          const dataCheckUpdateSource = {
            connectionConfiguration:
              dataDecrypt?.connection_configuration || {},
            sourceId: dataDecrypt?.source_id,
            name: dataDecrypt?.name,
          };

          const encryptDataCheckConnection = await encryptData({
            api: '/v1/scheduler/sources/check_connection',
            body: stringify(dataCheckConnectionServer),
          });

          const encryptDataCheckUpdateSource = await encryptData({
            api: '/v1/sources/check_connection_for_update',
            body: stringify(dataCheckUpdateSource),
          });

          return instanceCoreApi.post(
            API.CHECK_CONNECTION_AIR_BYTE,
            rowData
              ? { data: encryptDataCheckUpdateSource }
              : { data: encryptDataCheckConnection },
          );
        }}
        resource={
          rowData ? API.UPDATE_SOURCE_AIR_BYTE : API.CREATE_SOURCE_AIR_BYTE
        }
        readOnly={isModalDetailOpen}
        title={isModalEditOpen ? titleModalUpdate : titleModal}
        initialValues={rowData || {}}>
        <ComponentModal isEdit={rowData?.connection_mapping} />
      </FormRowDataTable>
      <AntModal
        okButtonProps={{ hidden: true }}
        size={MODAL_SIZE.XLARGE}
        title='Chọn loại dữ liệu nguồn'
        open={isModalNewOpen}
        onCancel={() => setIsModalNewOpen(false)}>
        <Row gutter={[10, 16]}>
          <Col span={8}>
            <ButtonSelectSource
              sourceImg={MSSQL}
              onClick={() => {
                setIdSource(SOURCE_DEFINITION_MSSQL_ID);
                setSourceType(SOURCE_DEFINITION_MSSQL_TYPE);
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
                setIdSource(SOURCE_DEFINITION_POSTGRES_ID);
                setSourceType(SOURCE_DEFINITION_POSTGRES_TYPE);
                setIsModalNewOpen(false);
              }}
              alt={'Postgres'}
              title={'PostgreSQL'}
            />
          </Col>
          <Col span={8}>
            <ButtonSelectSource
              onClick={() => {
                setIdSource(SOURCE_DEFINITION_MYSQL_ID);
                setSourceType(SOURCE_DEFINITION_MYSQL_TYPE);
                setIsModalNewOpen(false);
              }}
              sourceImg={MySQL}
              alt={'MySQL'}
              title={'MySQL'}
            />
          </Col>
          <Col span={8}>
            <ButtonSelectSource
              sourceImg={Oracle}
              onClick={() => {
                setIdSource(SOURCE_DEFINITION_ORACLE_ID);
                setSourceType(SOURCE_DEFINITION_ORACLE_TYPE);
                setIsModalNewOpen(false);
              }}
              alt={'Oracle'}
              title={'Oracle'}
            />
          </Col>
          <Col span={8}>
            <ButtonSelectSource
              sourceImg={APIImageSource}
              onClick={() => {
                setIdSource(SOURCE_DEFINITION_API_ID);
                setIsModalNewOpen(false);
              }}
              alt={'API'}
              title={'API'}
            />
          </Col>
          <Col span={8}>
            <ButtonSelectSource
              sourceImg={File}
              onClick={() => {
                setIdSource(SOURCE_DEFINITION_FILE_ID);
                setIsModalNewOpen(false);
              }}
              alt={'File'}
              title={'File'}
            />
          </Col>
        </Row>
      </AntModal>
    </>
  );
};
export default wrapperTableInterSource(IntegrateSourceDatabasePage);
