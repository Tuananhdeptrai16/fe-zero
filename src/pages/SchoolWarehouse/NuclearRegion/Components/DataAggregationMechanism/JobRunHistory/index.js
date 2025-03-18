import { Col, Row, Table, Tag } from 'antd';
import React from 'react';
import FormContent from 'src/@crema/component/FormContent';
import style from './JobRunHistory.module.scss';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { RenderDateTime } from 'src/@crema/component/TableRender';
import FormSearchByStatus from './FormSearchByStatus';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { toNumberSpace } from 'src/shared/utils/filter';

JobRunHistory.propTypes = {
  dataListHistoryJob: PropTypes.array.isRequired,
  isHistoryRunJob: PropTypes.bool,
};

function JobRunHistory({
  dataListHistoryJob = [],
  isHistoryRunJob,
  dataSearch,
  setDataSearch,
}) {
  const dataResponseServer = dataListHistoryJob?.map((item, index) => {
    return {
      ...item,
      key: index,
      index: index + 1,
    };
  });

  let dataRenderTable = dataResponseServer || [];
  if (dataSearch?.status) {
    if (dataSearch?.status === 'all') {
      dataRenderTable = dataResponseServer;
    } else {
      const newDataSearchStatus = dataListHistoryJob?.filter((item) => {
        return item.state === dataSearch.status;
      });
      dataRenderTable = newDataSearchStatus?.map((item, index) => {
        return {
          ...item,
          key: index,
          index: index + 1,
        };
      });
    }
  }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 80,
      align: 'center',
      fixed: 'left',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'state',
      key: 'state',
      width: 120,
      fixed: 'left',
      render: (value) => {
        if (value === 'failed') {
          return <Tag color='#416ef0'>{'Thất bại'}</Tag>;
        } else if (value === 'success') {
          return <Tag color='#389e0d'>{'Thành công'}</Tag>;
        } else if (value === 'running') {
          return <Tag color='#13c2c2'>{'Đang chạy'}</Tag>;
        } else if (value === 'queued') {
          return <Tag color='#1677ff'>{'Chờ chạy'}</Tag>;
        } else {
          return <Tag color='#416ef0'>{'Thất bại'}</Tag>;
        }
      },
    },
    {
      title: 'Tên job',
      dataIndex: 'dag_id',
      key: 'dag_id',
      width: 200,
      fixed: 'left',
    },
    // column lich su job
    isHistoryRunJob
      ? {
          title: 'Id nhiệm vụ',
          dataIndex: 'dag_id',
          key: 'dag_id',
          width: 200,
        }
      : null,
    isHistoryRunJob
      ? {
          title: 'Toán tử',
          dataIndex: 'map_index',
          key: 'map_index',
          width: 180,
        }
      : null,
    isHistoryRunJob
      ? {
          title: 'Tên máy chủ',
          dataIndex: 'hostname',
          key: 'host_name',
          width: 180,
        }
      : null,
    isHistoryRunJob
      ? {
          title: 'Tên Unix',
          dataIndex: 'unixname',
          key: 'unix_name',
          width: 180,
        }
      : null,
    isHistoryRunJob
      ? {
          title: 'Trọng lượng ưu tiên',
          dataIndex: 'priority_weight',
          key: 'priority_weight',
          width: 200,
        }
      : null,
    isHistoryRunJob
      ? {
          title: 'Thử lại số',
          dataIndex: 'try_number',
          key: 'try_number',
          width: 200,
        }
      : null,
    isHistoryRunJob
      ? {
          title: 'Gộp lại',
          dataIndex: 'pool',
          key: 'pool',
          width: 200,
        }
      : null,
    {
      title: 'ID chạy',
      dataIndex: 'dag_run_id',
      key: 'dag_run_id',
      width: 240,
    },

    !isHistoryRunJob
      ? {
          title: 'Loại chạy',
          dataIndex: 'run_type',
          key: 'run_type',
          width: 180,
          render: (value) => {
            if (value === 'manual') {
              return 'Thủ công';
            } else if (value === 'scheduled') {
              return 'Lập lịch';
            } else {
              return value;
            }
          },
        }
      : null,
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'start_date',
      key: 'start_date',
      width: 200,
      align: 'center',
      render: (data) => {
        return <RenderDateTime value={data} />;
      },
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'end_date',
      key: 'end_date',
      width: 200,
      align: 'center',
      render: (data) => {
        return <RenderDateTime value={data} />;
      },
    },
    !isHistoryRunJob
      ? {
          title: 'Kích hoạt bên ngoài',
          dataIndex: 'external_trigger',
          key: 'external_trigger',
          width: 180,
          align: 'center',
          render: (data) => {
            return <span>{String(data)}</span>;
          },
        }
      : null,
  ].filter(Boolean);

  return (
    <div className={clsx(style.wrapHistoryRunJob)}>
      <Row>
        <Col span={24} className={clsx(style.headerSearch)}>
          <h4 className={clsx(style.search_title)}>Tìm kiếm</h4>
          <FormContent
            initialValues={{
              status: dataSearch?.status,
            }}
            onFinish={(value) => {
              setDataSearch(value);
            }}>
            <FormSearchByStatus dataSearch={dataSearch} />
          </FormContent>
        </Col>
        <Col span={24}>
          <Table
            dataSource={dataRenderTable}
            columns={columns}
            pagination={{
              total: dataRenderTable.length,
              showTotal: (total, range) => (
                <IntlMessages
                  id='table.pagination.show_total'
                  values={{
                    from: toNumberSpace(range[0]),
                    to: toNumberSpace(range[1]),
                    total: toNumberSpace(total),
                  }}
                />
              ),
              defaultPageSize: 5,
              pageSizeOptions: [5, 10, 20, 50, 100],
            }}
            scroll={{
              x: 1500,
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default JobRunHistory;
