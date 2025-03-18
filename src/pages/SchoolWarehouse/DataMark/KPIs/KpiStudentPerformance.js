import React from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import SummaryKPI from '../SummaryKPI';

const KpiStudentPerformance = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['kpis_student_performance']} />
      <SummaryKPI id={3} />
    </div>
  );
};

export default KpiStudentPerformance;
