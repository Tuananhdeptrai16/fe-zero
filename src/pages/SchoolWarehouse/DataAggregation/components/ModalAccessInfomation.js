import React, { useEffect, useState } from 'react';
import { Col, Row, Space, Table, Tooltip } from 'antd';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { formatDateJs } from 'src/shared/utils/DateTime';
import { copyStringToClipboard } from 'src/shared/utils/Clipboard';
import notification from 'src/shared/utils/notification';
import { truncate } from 'lodash';
import { useIntl } from 'react-intl';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';

const ModalAccessInfomation = ({ rowData }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { messages } = useIntl();
  const [isCopied, setIsCopied] = useState(false);
  function formatCurlCommand(curlArray) {
    let formattedCurl = curlArray.join('\n');
    // Xóa \ thừa trong phần body của API
    formattedCurl = formattedCurl.replace(/ \\\n(?=\s*")/g, '\n');
    return formattedCurl;
  }
  const cUrlFormat = formatCurlCommand(rowData?.curl);

  const fullName = [
    rowData?.user_info_response.first_name,
    rowData?.user_info_response.last_name,
  ]
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    const selectedRowKeyOld = rowData?.columns_selected?.map((item) => {
      return item;
    });
    setSelectedRowKeys(selectedRowKeyOld);
  }, []);

  const { data: dataColumns, isLoading: isLoadingGetColumns } = useFetch(
    {
      method: METHOD_FETCH.GET,
      url: API.GET_LIST_COLUMNS_BY_TABLENAME(rowData?.table_name),
    },
    [rowData?.id],
  );

  const dataSource = dataColumns?.result?.tables[0].column_list;

  const columns = [
    {
      title: 'Tên cột',
      dataIndex: 'column_name',
      key: 'column_name',
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    getCheckboxProps: () => ({
      disabled: true,
    }),
  };
  return (
    <>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Space size={[8, 0]}>
            <span className={'font-bold'}>{`${messages['modal.cURL']}: `}</span>
            <span className={'font-bold'}>
              {truncate(rowData?.curl, { length: 70 })}
            </span>
            <Tooltip
              title={
                isCopied ? (
                  <span>
                    <CheckOutlined /> {messages['form.formTitleCopied']}
                  </span>
                ) : (
                  messages['form.formTitleCopy']
                )
              }
              key={'modal.cURL'}>
              <CopyOutlined
                style={{ color: '#416ef0', cursor: 'pointer' }}
                onClick={() => {
                  copyStringToClipboard(cUrlFormat);
                  setIsCopied(true);
                  notification.success('Sao chép cURL thành công');
                }}
              />
            </Tooltip>
          </Space>
        </Col>
        <Col span={24}>
          <Space size={[8, 0]}>
            <span className={'font-bold'}>
              {`${messages['table.dataServiceCreatedAt']}: `}
            </span>
            <span>{formatDateJs(rowData?.created_at)}</span>
          </Space>
        </Col>
        <Col span={24}>
          <Space size={[8, 0]}>
            <span className={'font-bold'}>
              {`${messages['table.creator']}: `}
            </span>
            <span>{fullName}</span>
          </Space>
        </Col>
        <Col span={24}>
          <Space size={[8, 0]}>
            <span className={'font-bold'}>
              {`${messages['table.name_table']}: `}
            </span>
            <span>{rowData?.table_name}</span>
          </Space>
        </Col>
        <Col span={24}>
          <Space size={[8, 0]} className='mb-1'>
            <span className={'font-bold'}>
              {`${messages['modal.column_table']}: `}
            </span>
          </Space>
          <Table
            key={`data-table-${isLoadingGetColumns}`}
            dataSource={dataSource}
            columns={columns}
            rowSelection={rowSelection}
            rowKey='column_name'
          />
        </Col>
      </Row>
    </>
  );
};

export default ModalAccessInfomation;
