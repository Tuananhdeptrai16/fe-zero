import React from 'react';
import style from './IframeAirflow.module.scss';
import clsx from 'clsx';
import AntButton from 'src/@crema/component/AntButton';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import config from 'src/config';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import useIntl from 'react-intl/lib/src/components/useIntl';

const marginLeft = 20;

function IframeAirflow() {
  const navigate = useNavigate();
  const { messages } = useIntl();
  return (
    <div className={clsx(style.wrapIframeAirflow)}>
      <AppPageMetadata title={messages['sidebar.data_air_flow']} />
      <div className={clsx(style.wrapIframeAirflow_action)}>
        <AntButton
          icon={<PlusOutlined />}
          type='primary'
          onClick={() => {
            navigate(config.routes.airflowAddData);
          }}>
          Tạo mới
        </AntButton>
      </div>
      <iframe
        src='https://datamine.mhdigital.vn/airflow/'
        height={`${window.innerHeight - 20}px`}
        className={clsx(style.iframeAirflow)}
        style={{
          marginLeft: `${-marginLeft}px`,
          width: `calc(100% + ${marginLeft}px)`,
        }}></iframe>
    </div>
  );
}

export default IframeAirflow;
