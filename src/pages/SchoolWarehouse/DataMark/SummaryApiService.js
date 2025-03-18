import React from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';

const SummaryApiService = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['summary_api_service']} />
    </div>
  );
};

export default SummaryApiService;
