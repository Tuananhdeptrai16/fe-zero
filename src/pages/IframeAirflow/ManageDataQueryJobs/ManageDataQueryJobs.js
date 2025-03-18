import React, { useRef } from 'react';
import style from './ManageDataQueryJobs.module.scss';
import clsx from 'clsx';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import useIntl from 'react-intl/lib/src/components/useIntl';
import { useNavigate } from 'react-router-dom';
import routes from 'src/config/routes.config';

const marginLeft = 20;

function ManageDataQueryJobs() {
  const { messages } = useIntl();
  const navigate = useNavigate();
  const refLoadInitIFrame = useRef(false);

  const handleIframeLoad = () => {
    if (refLoadInitIFrame.current) {
      navigate(routes.manageDataQueryJobsAirflow);
    }
    refLoadInitIFrame.current = true;
  };
  return (
    <div className={clsx(style.wrapIframeAirflow)}>
      <AppPageMetadata title={messages['sidebar.manage_data_query_jobs']} />
      <iframe
        src='https://vphc.mhdigital.vn/airflow/job/list/'
        height={`${window.innerHeight - 40}px`}
        className={clsx(style.iframeAirflow)}
        onLoad={handleIframeLoad}
        style={{
          marginLeft: `${-marginLeft}px`,
          width: `calc(100% + ${marginLeft}px)`,
        }}></iframe>
    </div>
  );
}

export default ManageDataQueryJobs;
