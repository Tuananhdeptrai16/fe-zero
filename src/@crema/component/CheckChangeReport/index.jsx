import React, { useMemo } from 'react';
import { Table } from 'antd';
import { PROJECT_CHANGE_LABEL } from 'src/shared/constants/ProjectConstants';
import { isEmpty } from 'src/shared/utils/Typeof';

const columns = [
  {
    title: 'Nội dung',
    dataIndex: 'content',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'Phiên bản chỉnh sửa',
    dataIndex: 'changed',
    width: 100,
  },
];

const CheckChangeReport = (props) => {
  const { history } = props;
  const dataChange = history;
  const dataSource = useMemo(() => {
    if (!isEmpty(dataChange)) {
      return PROJECT_CHANGE_LABEL.map((field) => {
        if (dataChange[field?.value]) {
          return {
            id: field?.value,
            key: field?.value,
            content: field?.belongsTo,
            changed: field?.render(dataChange[field?.value]),
          };
        }
      }).filter((item) => !!item);
    }
    return [];
  }, [dataChange]);
  console.log({ dataChange, dataSource });

  if (isEmpty(dataChange)) {
    return <p>Dự án không có thay đổi</p>;
  }

  return (
    <Table
      className={'table-approve-history'}
      dataSource={dataSource || []}
      columns={columns}
      pagination={false}
    />
  );
};

export default CheckChangeReport;
