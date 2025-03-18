import React, { useState } from 'react';
import DataTable from 'src/@crema/core/DataTable';
import { Col, Row } from 'antd';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import API from 'src/@crema/services/apis';
import FormDateRangePicker from 'src/@crema/core/Form/FormDateRangePicker';
import moment from 'moment';
import { SQL_ISO_DATE } from 'src/shared/constants/Format';
import FormInput from 'src/@crema/core/Form/FormInput';
import { RenderDateTime } from 'src/@crema/component/TableRender';
import { FILTER_TYPE } from 'src/shared/constants/DataTable';

const FormManageAccessInformation = ({ rowData }) => {
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
            label='Thời gian:'
            name='start_time'
            onChange={handleRangePicker}
          />
        </Col>
        <Col span={12}>
          <FormInput
            label='IP:'
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
            syncURL={false}
            isShowHeaderTable={false}
            initTable={{
              body: {
                filters: [
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
                ].filter(Boolean),
              },
            }}
            rowKey={rowData?.id}
            url={API.GET_LOG_API(rowData?.id)}
            columns={[
              {
                title: <IntlMessages id={'table.dataServiceHistoryTime'} />,
                dataIndex: 'start_time',
                key: 'start_time',
                width: 200,
                align: 'center',
                render: (_, date) => {
                  const time = date?.start_time;
                  return <RenderDateTime value={time ? time : null} />;
                },
              },
              {
                title: <IntlMessages id={'table.dataServiceHistoryIP'} />,
                dataIndex: 'ip_address',
                key: 'ip_address',
                width: 200,
              },
              {
                title: <IntlMessages id={'table.dataServiceHistoryStatus'} />,
                dataIndex: 'response_body',
                key: 'active',
                width: 170,
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
                width: 200,
                render: (record) => JSON.parse(record)?.code,
              },
              {
                title: (
                  <IntlMessages id={'table.dataServiceHistoryUserAgent'} />
                ),
                dataIndex: 'response_body',
                key: 'user_agent',
                width: 200,
                render: (record) => JSON.parse(record)?.user_agent,
              },
            ]}
          />
        </Col>
      </Row>
    </>
  );
};

export default FormManageAccessInformation;
