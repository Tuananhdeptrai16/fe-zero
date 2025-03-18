import React, { useState } from 'react';
import DataTable from 'src/@crema/core/DataTable';
import { Col, Row } from 'antd';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { isEmpty } from 'src/shared/utils/Typeof';
import { formatDateJs } from 'src/shared/utils/DateTime';
import { DATA_SERVICE_API } from 'src/@crema/services/apis';
import FormDateRangePicker from 'src/@crema/core/Form/FormDateRangePicker';
import moment from 'moment';
import { DATE_TIME, SQL_ISO_DATE } from 'src/shared/constants/Format';
import FormInput from 'src/@crema/core/Form/FormInput';
import { FILTER_TYPE } from 'src/shared/constants/DataTable';
// import { useDataTableContext } from 'src/@crema/core/DataTable/DataTableContext';
// import { useLocation } from 'react-router-dom';

const FormShowHistory = ({ rowData, category }) => {
  // const [filterTime, setFilterTime] = useState([]);

  // const { search: searchDT, setSearch: setSearchDT } = useDataTableContext();
  // const { search: searchUrl } = useLocation();
  // const searchParams = useMemo(
  //   () => new URLSearchParams(searchUrl),
  //   [searchUrl],
  // );
  // const [search, setSearch] = useState(searchParams.get('q') || searchDT);

  // const onChangeSearch = (e) => {
  //   setSearch(e.target.value);
  //   setSearchDT(e.target.value);
  // };

  // const handleRangePicker = (dates) => {
  //   setFilterTime([moment(dates?.[0]).valueOf(), moment(dates?.[1]).valueOf()]);
  // };

  const [filterTime, setFilterTime] = useState([]);
  const [ipSearch, setIpSearch] = useState('');

  const onChangeSearch = (e) => {
    setIpSearch(e.target.value);
  };

  const handleRangePicker = (dates) => {
    if (dates?.[0] && dates?.[1]) {
      const startOfDay = moment(dates[0]).startOf('day').valueOf();
      const endOfDay = moment(dates[1]).endOf('day').valueOf();
      setFilterTime([startOfDay, endOfDay]);
    } else {
      setFilterTime([]);
    }
  };

  return (
    <>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <FormDateRangePicker
            label='Thời gian'
            name='start_time'
            onChange={handleRangePicker}
          />
        </Col>
        <Col span={12}>
          <FormInput
            label='IP'
            name='ip_address'
            placeholder='Nhập IP'
            value={ipSearch}
            onChange={onChangeSearch}
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <DataTable
            key={`history-${filterTime}-${ipSearch}`}
            isShowHeaderTable={false}
            initTable={{
              body: {},
              // filter: !isEmpty(category)
              //   ? filterTime[0] !== filterTime[1]
              //     ? [
              //         {
              //           name: 'code_type',
              //           value: `${rowData?.name}_${rowData?.client_id}`,
              //           operation: 'eq',
              //         },
              //         {
              //           name: 'start_time',
              //           value: filterTime[0],
              //           operation: 'gte',
              //         },
              //         {
              //           name: 'start_time',
              //           value: filterTime[1],
              //           operation: 'lte',
              //         },
              //       ]
              //     : [
              //         {
              //           name: 'code_type',
              //           value: `${rowData?.name}_${rowData?.client_id}`,
              //           operation: 'eq',
              //         },
              //       ]
              //   : [],
              filters: !isEmpty(category)
                ? [
                    {
                      name: 'code_type',
                      value: `${rowData?.name}_${rowData?.client_id}`,
                      operation: 'eq',
                    },
                    filterTime[0] && {
                      type: FILTER_TYPE.DATE,
                      name: 'start_time',
                      value: filterTime[0],
                      operation: 'gte',
                      formatStr: SQL_ISO_DATE,
                    },
                    filterTime[1] && {
                      type: FILTER_TYPE.DATE,
                      name: 'start_time',
                      value: filterTime[1],
                      operation: 'lte',
                      formatStr: SQL_ISO_DATE,
                    },
                    ipSearch && {
                      name: 'ip_address',
                      value: ipSearch,
                      operation: 'eq',
                    },
                  ].filter(Boolean)
                : [],
            }}
            rowKey={rowData?.id}
            url={DATA_SERVICE_API.GET_HISTORY_DATA_SERVICE}
            columns={[
              {
                title: <IntlMessages id={'table.dataServiceHistoryTime'} />,
                dataIndex: 'start_time',
                key: 'start_time',
                width: 140,
                render: (record) => formatDateJs(record, DATE_TIME),
              },
              {
                title: <IntlMessages id={'table.dataServiceHistoryName'} />,
                dataIndex: 'response_body',
                key: 'name',
                width: 140,
                render: (record) => JSON.parse(record)?.username,
              },
              {
                title: <IntlMessages id={'table.dataServiceHistoryClientId'} />,
                dataIndex: 'response_body',
                key: 'client_id',
                width: 140,
                render: (record) => JSON.parse(record)?.client_id,
              },
              {
                title: <IntlMessages id={'table.dataServiceHistoryStatus'} />,
                dataIndex: 'response_body',
                key: 'active',
                width: 140,
                render: (record) =>
                  JSON.parse(record)?.status === 'success'
                    ? 'Thành công'
                    : 'Thất bại',
              },
              {
                title: (
                  <IntlMessages id={'table.dataServiceHistoryErrorCode'} />
                ),
                dataIndex: 'response_body',
                key: 'code',
                width: 140,
                render: (record) => JSON.parse(record)?.code,
              },
              {
                title: <IntlMessages id={'table.dataServiceHistoryIP'} />,
                dataIndex: 'ip_address',
                key: 'ip_address',
                width: 140,
              },
              {
                title: (
                  <IntlMessages id={'table.dataServiceHistoryUserAgent'} />
                ),
                dataIndex: 'response_body',
                key: 'user_agent',
                width: 140,
                render: (record) => JSON.parse(record)?.user_agent,
              },
            ]}
          />
        </Col>
      </Row>
    </>
  );
};

export default FormShowHistory;
