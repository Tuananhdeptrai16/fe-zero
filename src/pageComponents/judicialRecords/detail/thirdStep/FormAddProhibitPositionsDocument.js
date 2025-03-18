import React from 'react';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { parse } from 'src/shared/utils/String';
import { useIntl } from 'react-intl';

const FormAddProhibitPositionsDocument = ({ ignoreIds }) => {
  const { messages } = useIntl();
  return (
    <div>
      <FormSelectAsync
        disabled={false}
        label='judicial.addProhibitPositionsDocument'
        name='document'
        fieldNames={{ label: 'display_name', value: 'id' }}
        buildQuery={({ search, pageable }) => ({
          data: {
            query: search,
            ignore_ids: ignoreIds,
            pageable,
          },
        })}
        configFetch={{
          url: API.SEARCH_ES_PROHIBIT,
          method: METHOD_FETCH.POST,
        }}
        required
        returnObject
        renderItem={(option, index) => {
          const data = {
            ...parse(option?.content),
            ...option,
          };

          return (
            <div key={`item-${index}`}>
              <div>Mã quyết định: {data.decision_number}</div>
              <div>Tên quyết định: {data.decision_name}</div>
              <div>
                {messages['common.objectName']}: {data.full_name}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

FormAddProhibitPositionsDocument.propTypes = {};

FormAddProhibitPositionsDocument.defaultProps = {};

export default FormAddProhibitPositionsDocument;
