import React from 'react';
import IocDiseaseShared from '../components/IocDiseaseShared';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import useIntl from 'react-intl/lib/src/components/useIntl';

function IocMedical() {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['sidebar.IOC_medical']} />
      <IocDiseaseShared
        urlIframe='https://ioc.versatica.io/superset/dashboard/CTKB-Destop/'
        iocMedical={false}
      />
    </div>
  );
}

export default IocMedical;
