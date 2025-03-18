import React from 'react';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';
import { RenderFieldRawContent } from 'src/@crema/component/TableRender';
import { FIELD_MAP } from 'src/shared/constants/FieldKeyMap';
import { useIntl } from 'react-intl';

const FormAddVerdict = ({ ignoreIds }) => {
  const { messages } = useIntl();
  return (
    <div>
      <FormSelectAsync
        disabled={false}
        label='table.verdict'
        name='verdict'
        fieldNames={{ label: 'display_name', value: 'id' }}
        configFetch={{
          url: API.SELECT_VERDICT,
          method: METHOD_FETCH.POST,
          body: {
            keyword: null,
            page: 1,
            filters: [
              {
                name: 'id',
                value: ignoreIds,
                operation: FILTER_OPERATION.NIN,
              },
            ],
          },
        }}
        required
        returnObject
        renderItem={(option, index) => {
          return (
            <div key={`item-${index}`}>
              <div>Mã bản án: {option.case_number}</div>
              {/*<div>Tên bản án: {option.name}</div>*/}
              <div>
                {messages['judicial.sentenceDay']}:{' '}
                <RenderFieldRawContent
                  field={FIELD_MAP.NGAY_TUYEN_AN}
                  rawText={option?.content}
                />
              </div>
              <div>
                {messages['common.objectName']}:{' '}
                <RenderFieldRawContent
                  field={'full_name'}
                  rawText={option?.raw_document_object?.object}
                />
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

FormAddVerdict.propTypes = {};

FormAddVerdict.defaultProps = {};

export default FormAddVerdict;
