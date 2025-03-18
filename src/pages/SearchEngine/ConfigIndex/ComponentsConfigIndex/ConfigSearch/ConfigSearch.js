import React, { useState } from 'react';
import clsx from 'clsx';
import style from './ConfigSearch.module.scss';
import AntButton from 'src/@crema/component/AntButton';
import FormContent from 'src/@crema/component/FormContent';
import FormInput from 'src/@crema/core/Form/FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import useCallApi from 'src/@crema/hook/useCallApi';
import { getMessageResponse } from 'src/shared/utils/Service';
import useIntl from 'react-intl/lib/src/components/useIntl';
import API from 'src/@crema/services/apis';
import notification from 'src/shared/utils/notification';
import { CONFIG_INDEX } from 'src/shared/constants/ActionTypes';

function ConfigSearch() {
  const dispatch = useDispatch();
  const [disabledBtn, setDisableBtn] = useState(false);
  const configIndexAll = useSelector((state) => state?.common?.configIndex);
  const configIndex = configIndexAll?.config
    ? JSON.parse(configIndexAll.config)
    : {};

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
      notification.success('Cấu hình kết quả tìm kiếm thành công');
    },
    callApi: onSaveToServer,
    error: (err) => {
      const messageError =
        getMessageResponse(err) || 'Cấu hình kết quả tìm kiếm thất bại';
      notification.error(messages[messageError] || messageError);
    },
  });
  const handelUpdatePageSize = (value) => {
    const newDataUpdatePageSize = {
      ...configIndex,
      page_size: Number.parseInt(value?.page_size),
    };
    send(newDataUpdatePageSize);
  };

  return (
    <FormContent
      onFinish={handelUpdatePageSize}
      initialValues={{
        page_size: configIndex?.page_size,
      }}
      onFieldsChange={(value) => {
        if (value[0].errors.length > 0) {
          setDisableBtn(true);
        } else {
          setDisableBtn(false);
        }
      }}>
      <div className={clsx(style.wrapConfigSearch)}>
        <div className={clsx(style.config_header)}>
          <label
            htmlFor='input_page_size'
            className={clsx(style.config_header_title)}>
            Số bản ghi tối đa trên 1 trang
          </label>
          <FormInput
            type='number'
            id='input_page_size'
            name='page_size'
            placeholder='Nhập số bản ghi'
            labelHidden='Số bản ghi tối đa trên 1 trang'
            required
            rules={{ numeric_positive: [] }}
            min={1}
            className={clsx(style.input)}
          />
        </div>
        <div className={clsx(style.wrapActionConfig)}>
          <AntButton
            disabled={disabledBtn}
            loading={loading}
            htmlType='submit'
            type='primary'>
            Xác nhận
          </AntButton>
        </div>
      </div>
    </FormContent>
  );
}

export default ConfigSearch;
