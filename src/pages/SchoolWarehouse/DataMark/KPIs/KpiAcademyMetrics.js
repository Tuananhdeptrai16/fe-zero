import React from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import SummaryKPI from '../SummaryKPI';

const KpiAcademyMetrics = () => {
  const { messages } = useIntl();

  return (
    <div>
      <AppPageMetadata title={messages['kpis_academy_metrics']} />
      <SummaryKPI id={1} />
    </div>
  );
};

export default KpiAcademyMetrics;
