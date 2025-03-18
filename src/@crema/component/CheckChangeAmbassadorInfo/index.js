import React, { useMemo } from 'react';
import { Empty, Spin, Table } from 'antd';
import { isEmpty } from 'lodash';
import { AMBASSADOR_CHANGE_LABEL } from 'src/shared/constants/ambassador.constant';
import { compareFieldChangeProject } from 'src/shared/utils/Project';

const columns = [
  {
    title: 'Nội dung',
    dataIndex: 'content',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'Phiên bản hiện tại',
    dataIndex: 'original',
    width: 200,
  },
  {
    title: 'Phiên bản chỉnh sửa',
    dataIndex: 'changed',
    width: 200,
  },
];

const CheckChangeAmbassadorInfo = ({ data }) => {
  const beforeData = data?.ambassador_response;

  const dataSource = useMemo(() => {
    if (!isEmpty(data) && !isEmpty(beforeData)) {
      return AMBASSADOR_CHANGE_LABEL.map((field) => {
        if (!compareFieldChangeProject(beforeData, data, field)) {
          if (field.fieldId) {
            return {
              id: field?.value,
              key: field?.value,
              content: field?.belongsTo,
              original: field?.render(
                beforeData[field?.fieldId]?.[field?.value],
              ),
              changed: field?.render(data[field?.fieldId]?.[field?.value]),
            };
          }
          return {
            id: field.value,
            key: field.value,
            content: field.belongsTo,
            original: field?.render(beforeData[field?.value]),
            changed: field?.render(data[field?.value]),
          };
        }
      }).filter((f) => !!f);
    }
    return [];
  }, [data]);

  return (
    <Spin spinning={false}>
      <Table
        className={'table-approve-history'}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={'Không có thay đổi nào!'}
            />
          ),
        }}
      />
    </Spin>
  );
};

export default CheckChangeAmbassadorInfo;
