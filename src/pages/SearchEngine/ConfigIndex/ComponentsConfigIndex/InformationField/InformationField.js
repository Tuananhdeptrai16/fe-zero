import React, { useState } from 'react';
import { Skeleton, Table } from 'antd';
import AntButton from 'src/@crema/component/AntButton';
import style from './InfomationField.module.scss';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import FormContent from 'src/@crema/component/FormContent';
import FormInput from 'src/@crema/core/Form/FormInput';

import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import useCallApi from 'src/@crema/hook/useCallApi';
import { getMessageResponse } from 'src/shared/utils/Service';
import useIntl from 'react-intl/lib/src/components/useIntl';
import API from 'src/@crema/services/apis';
import notification from 'src/shared/utils/notification';
import { useDispatch } from 'react-redux';
import { CONFIG_INDEX } from 'src/shared/constants/ActionTypes';
import { POSITIVE_NUMBER } from 'src/shared/constants/Regex';

InformationField.propTypes = {
  configIndexOld: PropTypes.object,
  dataResponseIndex: PropTypes.object,
};

function InformationField({ configIndexOld, dataResponseIndex }) {
  const dispatch = useDispatch();
  const dataRenderTable = configIndexOld?.config?.map((item, index) => {
    return {
      ...item,
      key: `${item?.new_field_name},${index}`,
    };
  });

  const [scoreIndex, setScoreIndex] = useState(dataRenderTable || []);

  const isEmptyScore = scoreIndex?.find((item) => {
    return POSITIVE_NUMBER.test(item.score) === false;
  });
  // useCallAPI server
  const { messages } = useIntl();
  const onSaveToServer = (data) => {
    return instanceCoreApi.put(
      API.UPDATE_CONFIG_INDEX(dataResponseIndex?.id),
      data,
    );
  };

  const { loading, send } = useCallApi({
    success: (response) => {
      const newConfigIndex = response?.result;
      dispatch({ type: CONFIG_INDEX, payload: newConfigIndex });
      notification.success('Cập nhật trọng số thành công');
    },
    callApi: onSaveToServer,
    error: (err) => {
      const messageError =
        getMessageResponse(err) || 'Cập nhật trọng số thất bại';
      notification.error(messages[messageError] || messageError);
    },
  });

  const handleUpdateScore = () => {
    const newDataUpdateScore = {
      config: scoreIndex,
      page_size: configIndexOld?.page_size,
    };

    send(newDataUpdateScore);
  };

  const columns = [
    {
      title: 'Tên trường',
      dataIndex: 'new_field_name',
      key: 'new_field_name',
    },
    {
      title: 'Trọng số',
      dataIndex: 'score',
      key: 'score',
      width: 400,
      render: (_, record) => {
        return (
          <FormContent
            initialValues={{
              [record.key]: record?.score,
            }}>
            <FormInput
              type='number'
              required
              name={record.key}
              labelHidden='Trọng số'
              placeholder='Nhập trọng số'
              min={1}
              rules={{ numeric_positive: [] }}
              onChange={(e) => {
                const valueInput = e?.target?.value;
                const newScore = {
                  ...record,
                  score: valueInput,
                };
                setScoreIndex((prev) => {
                  const index = prev.findIndex((item) => {
                    return item?.key === record?.key;
                  });
                  if (index === -1) {
                    return [...prev, newScore];
                  } else {
                    const newScoreCopy = [...prev];
                    newScoreCopy[index].score = valueInput;
                    return newScoreCopy;
                  }
                });
              }}
            />
          </FormContent>
        );
      },
    },
  ];

  return (
    <div>
      {!dataRenderTable ? (
        <>
          <Skeleton active />
        </>
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={dataRenderTable}
            pagination={false}
            scroll={{
              y: 'calc(100vh - 400px)',
            }}
          />

          <div className={clsx(style.wrapActions)}>
            <AntButton
              type='primary'
              onClick={handleUpdateScore}
              loading={loading}
              disabled={isEmptyScore ? true : false}>
              Xác nhận thay đổi
            </AntButton>
          </div>
        </>
      )}
    </div>
  );
}

export default InformationField;
