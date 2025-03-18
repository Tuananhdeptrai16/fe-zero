import React from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import SummaryKPI from '../SummaryKPI';

const KpiFacultyQuality = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['kpis_faculty_quality']} />
      <SummaryKPI id={4} />
    </div>
  );
};

export default KpiFacultyQuality;
