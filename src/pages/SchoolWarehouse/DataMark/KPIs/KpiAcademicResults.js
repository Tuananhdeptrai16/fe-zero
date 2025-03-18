import React from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import SummaryKPI from '../SummaryKPI';

const KpiAcademicResults = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['kpis_academic_results']} />
      <SummaryKPI id={7} />
    </div>
  );
};

export default KpiAcademicResults;
