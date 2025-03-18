import React from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import SummaryKPI from '../SummaryKPI';

const KpiResearchActivities = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['kpis_research_activities']} />
      <SummaryKPI id={5} />
    </div>
  );
};

export default KpiResearchActivities;
