import React, { useRef } from 'react';
import style from './AddDataSourceAirflow.module.scss';
import clsx from 'clsx';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import useIntl from 'react-intl/lib/src/components/useIntl';
import { useNavigate } from 'react-router-dom';
import routes from 'src/config/routes.config';

function AddDataSourceAirflow() {
  const refLoadInitIFrame = useRef(false);
  const { messages } = useIntl();
  const navigate = useNavigate();

  const handleIframeLoad = () => {
    if (refLoadInitIFrame.current) {
      navigate(routes.airflowConfig);
    }
    refLoadInitIFrame.current = true;
  };

  const marginLeft = 20;

  return (
    <div className={clsx(style.wrapAddDataSourceAirflow)}>
      <AppPageMetadata title={messages['sidebar.data_air_flow_add']} />
      <SubHeaderApp>
        <SubHeaderAppTemplate
          title={<IntlMessages id={'sidebar.data_air_flow_add'} />}
          isShowGoBack
        />
      </SubHeaderApp>
      <iframe
        src='https://datamine.mhdigital.vn/airflow/code_editor/'
        height={`${window.innerHeight - 30}px`}
        id='data_air_flow_add'
        className={clsx(style.wrapIframeAirflow_add)}
        style={{
          marginLeft: `${-marginLeft}px`,
          width: `calc(100% + ${marginLeft}px + 40px)`,
        }}
        onLoad={handleIframeLoad}></iframe>
    </div>
  );
}

export default AddDataSourceAirflow;
