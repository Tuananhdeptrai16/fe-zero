import React, { useRef, useState } from 'react';
import { Col, Row } from 'antd';
import { isString } from 'src/shared/utils/Typeof.js';
import API from 'src/@crema/services/apis/index';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
// import RenderContentHTML from 'src/@crema/component/TableRender/RenderContentHTML';
import FormContent from 'src/@crema/component/FormContent';
import DataTable from 'src/@crema/core/DataTable';
import FormResult from './FormResult';
import { stringify } from 'src/shared/utils/String';
import { TABLE_SORT_VALUE } from 'src/shared/constants/DataTable';
import ExportToExcel from '../Components/ExportToExcel';
// import ExportToPDF from '../Components/ExportToPDF';
import AppIconButton from 'src/@crema/core/AppIconButton';
import { PrinterOutlined } from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';
// import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { isEmpty } from 'lodash';
// import useCallApi from 'src/@crema/hook/useCallApi';
import PrintContent from '../NuclearRegion/Components/LookCollectedResults/PrintContent';
import useFetch from 'src/@crema/hook/fetchData/useFetch';

export const FormSearch = ({ data }) => {
  const destinationId = data?.destination_id;
  // const [dataResult, setDataResult] = useState([]);
  const [table, setTable] = useState(null);

  const isDestinationValid =
    data?.destination?.display_name &&
    data?.destination?.host &&
    data?.destination?.port &&
    data?.destination?.schema &&
    data?.destination?.database;

  const databaseName = isDestinationValid
    ? `${data?.destination?.display_name}(${data?.destination?.host}:${data?.destination?.port})-${data?.destination?.schema}: ${data?.destination?.database}`
    : 'chưa có dữ liệu';
  const tableName = table?.table_name;

  // console.log({ destinationId, tableName });

  // get result
  // const { send: sendResult } = useCallApi({
  //   success: (res) => {
  //     const dataRes = res?.result?.items;
  //     // setDataResult(dataRes);
  //     console.log(dataRes);
  //   },
  //   callApi: (destination_id, table_name) => {
  //     console.log({ destination_id, table_name });
  //     return instanceCoreApi.post(API.GET_LOOKUP_INTERMEDIATE, {
  //       keyword: '',
  //       filters: [],
  //       pageable: {
  //         page: 1,
  //         page_size: 10,
  //         sort: [{ property: 'id', direction: 'desc' }],
  //       },
  //       destination_id: destination_id,
  //       table_name: table_name,
  //     });
  //   },
  // });

  const { data: dataTable } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: API.GET_LOOKUP_INTERMEDIATE,
      body: {
        destination_id: destinationId,
        table_name: table?.table_name,
      },
    },
    [destinationId, table],
  );

  // console.log(dataTable);

  const dataSource = isEmpty(dataTable)
    ? []
    : dataTable?.result?.items?.map((item, index) => {
        return {
          ...item,
          key: index,
        };
      });

  // console.log(dataSource);
  const columns = (table?.column_list || []).map((column, index) => {
    return {
      title: column?.column_name,
      dataIndex: column?.column_name,
      key: column?.column_name,
      width: 220,
      sorter: true,
      defaultSortOrder: index === 0 ? TABLE_SORT_VALUE.DESCEND : false,
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
              setTable(data?.table);
              // sendResult(destinationId, data?.table?.table_name);
            }}>
            <FormResult destinationId={destinationId} />
          </FormContent>
        </Col>
      </Row>
      <Row gutter={6}>
        <Col span={20}>
          <b>
            Cơ sở dữ liệu: <em>{databaseName}</em>
          </b>
        </Col>
      </Row>

      {tableName && (
        <>
          <br />
          <b>Tên bảng: {tableName}</b>
        </>
      )}
      <DataTable
        key={`data-table-${tableName}`}
        columns={columns}
        syncURL={false}
        method={METHOD_FETCH.POST}
        toolbars={[
          <ExportToExcel
            key={'export-excel-component'}
            destination_id={destinationId}
            urlExportExcel={API.EXPORT_EXCEL_LOOKUP_INTERMEDIATE_AREA}
            tableName={tableName}
            disabled={!tableName}
          />,
        ]}
        toolbarsMini={[
          // <ExportToPDF
          //   key={`download-pdf`}
          //   destination_id={destinationId}
          //   urlExportPDF={API.EXPORT_PDF_LOOKUP_INTERMEDIATE_AREA}
          //   tableName={tableName}
          //   disabled={!tableName}
          // />,
          <AppIconButton
            key={`download-pdf`}
            disabled={!tableName}
            icon={<PrinterOutlined />}
            title={'In'}
            onClick={() => handlePrint()}
          />,
        ]}
        initTable={{
          body: {
            destination_id: destinationId,
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
