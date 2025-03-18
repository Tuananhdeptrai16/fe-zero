import React, { useEffect, useMemo, useState } from 'react';
import { Spin, Table } from 'antd';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { PROJECT_API } from 'src/@crema/services/apis';
import { PROJECT_CHANGE_LABEL } from 'src/shared/constants/ProjectConstants';
import { cloneDeep } from 'lodash';
import { isEmpty } from 'src/shared/utils/Typeof';
import { compareFieldChangeProject, getValue } from 'src/shared/utils/Project';

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

const CheckChangeProject = (props) => {
  const { onChange, history, disabled } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { isLoading, data } = useFetch(
    {
      url: PROJECT_API.GET_DETAIL_PROJECT.replace(':id', history?.project_id),
      useCache: false,
    },
    [history?.project_id],
  );
  const projectSource = useMemo(() => {
    if (!data?.result) return null;
    const dataResult = data?.result || {};
    return {
      ...dataResult,
      util_ids: (dataResult?.utils || [])?.map((item) => item?.id),
    };
  }, [data?.result]);

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const dataChange = history?.edit_content;
  const dataSource = useMemo(() => {
    if (!isEmpty(projectSource) && !isEmpty(dataChange)) {
      const dataSourceNew = PROJECT_CHANGE_LABEL.map((field) => {
        if (!compareFieldChangeProject(projectSource, dataChange, field)) {
          return {
            id: field?.value,
            key: field?.value,
            content: field?.belongsTo,
            original: field?.render(projectSource[field?.value]),
            changed: field?.render(dataChange[field?.value]),
          };
        }
      }).filter((f) => !!f);
      if (!disabled) {
        setSelectedRowKeys(dataSourceNew.map((item) => item?.key));
      }
      return dataSourceNew;
    }
    return [];
  }, [projectSource, dataChange]);

  const getContentRS = (keys) => {
    const projectRS = cloneDeep(projectSource);
    keys.forEach((key) => {
      const field = PROJECT_CHANGE_LABEL.find((item) => item?.value === key);
      if (field) {
        projectRS[key] = dataChange[key];
        if (field?.fieldId && field?.key) {
          projectRS[field?.fieldId] = getValue(dataChange[key], field?.key);
        }
      }
    });
    return projectRS;
  };

  useEffect(() => {
    if (!disabled) {
      onChange(getContentRS(selectedRowKeys));
    }
  }, [selectedRowKeys, projectSource]);

  if (!isLoading && (isEmpty(dataChange) || isEmpty(dataSource))) {
    return <p>Dự án không có thay đổi</p>;
  }

  if (!isLoading && !projectSource) {
    return <p>Dự án không tồn tại</p>;
  }

  return (
    <Spin spinning={isLoading}>
      <Table
        className={'table-approve-history'}
        rowSelection={!disabled && rowSelection}
        dataSource={dataSource || []}
        columns={columns}
        pagination={false}
      />
    </Spin>
  );
};

export default CheckChangeProject;
