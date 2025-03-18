import React, { useState, useRef } from 'react';
import { Col, Row, Form } from 'antd';
import { isEmpty, isString } from 'src/shared/utils/Typeof.js';
import { PrinterOutlined } from '@ant-design/icons';
import API from 'src/@crema/services/apis/index';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
// import RenderContentHTML from 'src/@crema/component/TableRender/RenderContentHTML';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import AppIconButton from 'src/@crema/core/AppIconButton';
import { instanceCoreApi } from 'src/@crema/services/setupAxios.js';
import useCallApi from 'src/@crema/hook/useCallApi.js';
import FormContent from 'src/@crema/component/FormContent';
import DataTable from 'src/@crema/core/DataTable';
import FormResult from './FormResult';
import { stringify } from 'src/shared/utils/String';
import { useReactToPrint } from 'react-to-print';
import ExportCSV from '../SchoolWarehouse/NuclearRegion/Components/LookCollectedResults/ExportCSV';
import PrintContent from '../SchoolWarehouse/NuclearRegion/Components/LookCollectedResults/PrintContent';

export const FormSearch = ({ destination_id }) => {
  const [dataResult, setDataResult] = useState([]);
  const [tableName, setTableName] = useState('');
  const [databaseName, setDatabaseName] = useState('');
  const form = Form.useFormInstance();
  const watchTypeDestinationId = Form.useWatch('destination_id', form) || '';
  const { data } = useFetch(
    {
      method: METHOD_FETCH.GET,
      url: API.GET_LIST_TABLE_DESTINATION(destination_id),
    },
    [watchTypeDestinationId],
  );
  if (
    data?.result?.database_name &&
    databaseName !== data.result.database_name
  ) {
    setDatabaseName(data.result.database_name);
  }
  const listTableByDestination = data?.result?.tables || [];
  const optionsTableRender = isEmpty(listTableByDestination)
    ? []
    : listTableByDestination?.map((item) => {
        return {
          label: item?.table_name,
          value: item?.table_name,
        };
      });

  // get result
  const { loading: loadingResult, send: sendResult } = useCallApi({
    success: (res) => {
      const dataRes = res?.result?.items;
      setDataResult(dataRes);
    },
    callApi: ({ destination_id, table_name }) => {
      return instanceCoreApi.post(API.GET_LOOKUP_INTERMEDIATE, {
        keyword: '',
        filters: [],
        pageable: {
          page: 1,
          page_size: 10,
          sort: [{ property: 'id', direction: 'desc' }],
        },
        destination_id,
        table_name,
      });
    },
  });

  const dataSource = isEmpty(dataResult)
    ? []
    : dataResult?.map((item, index) => {
        return {
          ...item,
          key: index,
        };
      });

  const columns = isEmpty(dataResult)
    ? []
    : Object.keys(dataResult[0])?.map((item, index) => {
        return {
          title: item,
          dataIndex: item,
          key: `${item}_${index}`,
          width: 220,
          sorter: true,
          render: (value) =>
            // isString(value) || isObject(value) ? (
            //   <RenderContentHTML
            //     content={isString(value) ? value : stringify(value)}
            //     shortNumWord={42}
            //     isShowHTML
            //   />
            // ) : (
            isString(value) ? value : stringify(value),
          // ),
        };
      });
  // Export excel
  const excelHeaders = columns.map((col) => ({
    label: col.title,
    key: col.dataIndex,
  }));
  const excelData = dataSource;
  // Print content
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className={'ant-tab-table'}>
      <Row>
        <Col span={24}>
          <FormContent
            onFinish={(data) => {
              const table_name = data?.table_name;
              setTableName(table_name);
              sendResult({
                table_name,
                destination_id,
              });
            }}>
            <FormResult
              optionsTableRender={optionsTableRender}
              loadingResult={loadingResult}
            />
          </FormContent>
        </Col>
      </Row>
      <Row gutter={6}>
        <Col span={20}>
          <b>Cơ sở dữ liệu: {databaseName}</b>
        </Col>
      </Row>
      <br />
      <b>Tên bảng: {tableName}</b>
      <DataTable
        key={`data-table-${loadingResult}`}
        columns={columns}
        syncURL={false}
        method={METHOD_FETCH.POST}
        toolbars={[
          <ExportCSV
            key={'export-csv'}
            disabled={isEmpty(dataSource)}
            data={excelData}
            headers={excelHeaders}
            filename={`${tableName}-collected-results.csv`}
          />,
        ]}
        toolbarsMini={[
          <AppIconButton
            key={`download-pdf`}
            disabled={isEmpty(dataSource)}
            icon={<PrinterOutlined />}
            title={'In'}
            onClick={() => handlePrint()}
          />,
        ]}
        initTable={{
          body: {
            destination_id: destination_id,
            table_name: tableName,
          },
        }}
        url={API.GET_LOOKUP_INTERMEDIATE}></DataTable>
      <div style={{ display: 'none' }}>
        <PrintContent
          title='Kết quả tra cứu'
          ref={componentRef}
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    </div>
  );
};
