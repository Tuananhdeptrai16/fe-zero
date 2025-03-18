import React from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import SummaryKPI from '../SummaryKPI';

const KpiLearningProgress = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['kpis_learning_progress']} />
      <SummaryKPI id={6} />
    </div>
  );
};

export default KpiLearningProgress;
