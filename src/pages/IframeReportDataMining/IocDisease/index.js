import React from 'react';
import IocDiseaseShared from '../components/IocDiseaseShared';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import useIntl from 'react-intl/lib/src/components/useIntl';

function IocDisease() {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['sidebar.IOC_pandemic']} />
      <IocDiseaseShared
        urlIframe='https://lookerstudio.google.com/embed/reporting/fdf3eb8c-2f4b-4597-85ca-887a910d3965/page/jjqQC'
        iocMedical={true}
      />
    </div>
  );
}

export default IocDisease;
