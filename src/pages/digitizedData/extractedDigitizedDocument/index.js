import React from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { TableRecord } from 'src/pageComponents/records/TableRecord';
import { RAW_DOCUMENT_STATUS_DONE_OCR } from 'src/shared/constants/DataTableStatus';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';

const ExtractedDigitizedDocumentPage = () => {
  const { messages } = useIntl();
  return (
    <>
      <AppPageMetadata
        title={messages['sidebar.extracted_digitized_document']}
      />
      <TableRecord
        initTable={{
          filters: [
            {
              name: 'state',
              operation: FILTER_OPERATION.EQ,
              value: RAW_DOCUMENT_STATUS_DONE_OCR,
            },
          ],
        }}
      />
    </>
  );
};

export default ExtractedDigitizedDocumentPage;
