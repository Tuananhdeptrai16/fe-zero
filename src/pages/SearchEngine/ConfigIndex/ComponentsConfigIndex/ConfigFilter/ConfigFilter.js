import { Table, Select } from 'antd';
import React, { useState } from 'react';
import AntButton from 'src/@crema/component/AntButton';
import style from './ConfigFilter.module.scss';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import useCallApi from 'src/@crema/hook/useCallApi';
import { getMessageResponse } from 'src/shared/utils/Service';
import useIntl from 'react-intl/lib/src/components/useIntl';
import API from 'src/@crema/services/apis';
import notification from 'src/shared/utils/notification';
import { CONFIG_INDEX } from 'src/shared/constants/ActionTypes';
// import PropTypes from 'prop-types';

// Synonym.propTypes = {};

function ConfigFilter() {
  const dispatch = useDispatch();
  const configIndexAll = useSelector((state) => state?.common?.configIndex);
  const configIndex = configIndexAll?.config
    ? JSON.parse(configIndexAll.config)
    : {};
  const dataRenderTable =
    configIndex?.config?.map((item, index) => {
      return {
        ...item,
        key: `${item?.new_field_name},${index}`,
        index: index + 1,
      };
    }) || [];

  const [configFilter, setConfigFilter] = useState(dataRenderTable);
  // useCallAPI server
  const { messages } = useIntl();
  const onSaveToServer = (data) => {
    return instanceCoreApi.put(
      API.UPDATE_CONFIG_INDEX(configIndexAll?.id),
      data,
    );
  };

  const { loading, send } = useCallApi({
    success: (response) => {
      const newResponse = response?.result;
      dispatch({ type: CONFIG_INDEX, payload: newResponse });
      notification.success('Cấu hình bộ lọc thành công');
    },
    callApi: onSaveToServer,
    error: (err) => {
      const messageError =
        getMessageResponse(err) || 'Cấu hình bộ lọc thất bại';
      notification.error(messages[messageError] || messageError);
    },
  });

  const handelUpdateFilter = () => {
    const dataSaveServer = {
      config: configFilter,
      page_size: configIndex?.page_size,
    };
    send(dataSaveServer);
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 100,
    },
    {
      title: 'Tên trường',
      dataIndex: 'new_field_name',
      key: 'new_field_name',
      align: 'center',
    },
    {
      title: 'Loại',
      dataIndex: 'filter',
      key: 'filter',
      width: 400,
      align: 'center',
      render: (value) => {
        if (value?.default_config) {
          return <span>Mặc định</span>;
        } else {
          return <span>Tùy chỉnh</span>;
        }
      },
    },
    {
      title: 'Cấu hình',
      dataIndex: 'filter',
      key: 'config',
      width: 240,
      align: 'center',
      render: (_, record) => {
        return (
          <Select
            style={{
              width: 180,
            }}
            defaultValue={record?.filter?.attribute}
            onChange={(value) => {
              const valueChange = value;
              const newRecord = {
                ...record,
                filter: {
                  ...record?.filter,
                  attribute: valueChange,
                },
              };
              setConfigFilter((prev) => {
                const index = prev.findIndex((item) => {
                  return item?.key === record?.key;
                });
                if (index === -1) {
                  return [...prev, newRecord];
                } else {
                  const configCopy = [...prev];
                  configCopy[index].filter = {
                    ...configCopy[index]?.filter,
                    attribute: valueChange,
                    default_config: valueChange === 'default' ? true : false,
                  };
                  return configCopy;
                }
              });
            }}
            options={[
              {
                value: 'default',
                label: 'Mặc định',
              },
              {
                value: 'asc',
                label: 'Tăng',
              },
              {
                value: 'desc',
                label: 'Giảm',
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataRenderTable}
        pagination={false}
        scroll={{
          y: 'calc(100vh - 400px)',
        }}
      />
      <div className={clsx(style.wrapActionAddConfig)}>
        <AntButton
          loading={loading}
          type='primary'
          onClick={handelUpdateFilter}>
          Cập nhật bộ lọc
        </AntButton>
      </div>
    </div>
  );
}

export default ConfigFilter;
