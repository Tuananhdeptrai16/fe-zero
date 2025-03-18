import React from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import SummaryKPI from '../SummaryKPI';

const KpiTrainingStatus = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['kpis_training_status']} />
      <SummaryKPI id={2} />
    </div>
  );
};

export default KpiTrainingStatus;
