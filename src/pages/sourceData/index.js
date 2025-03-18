import React from 'react';
import {
  SOURCE_DEFINITION_FILE_ID,
  SOURCE_DEFINITION_FILE_NAME,
} from 'src/shared/constants/DataFixed';
import { FormSourceDataModal } from 'src/pages/sourceData/FormSourceDataModal';
import SourceDefinition from 'src/pages/sourceDefinition';

const SourceData = () => {
  const preSaveData = (data) => {
    const { storage, user_agent } = data;
    console.log('data', data);
    return {
      ...data,
      connection_configuration: {
        ...(data?.connection_configuration || {}),
        provider: {
          ...(data?.connection_configuration?.provider || {}),
          ...(storage === 'HTTPS' ? { user_agent: !!user_agent } : {}),
        },
      },
    };
  };
  return (
    <SourceDefinition
      ComponentFormModal={FormSourceDataModal}
      sourceName={SOURCE_DEFINITION_FILE_NAME}
      sourceId={SOURCE_DEFINITION_FILE_ID}
      preSaveData={preSaveData}
      initialValueAdd={{ port: 22 }}
    />
  );
};
export default SourceData;
