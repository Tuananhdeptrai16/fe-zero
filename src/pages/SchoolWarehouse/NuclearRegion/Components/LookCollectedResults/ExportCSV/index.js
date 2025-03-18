import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import AntButton from 'src/@crema/component/AntButton';
import { UploadOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';

const ExportCSV = forwardRef(
  ({ headers, data, filename, disabled, ...props }, ref) => {
    const { messages } = useIntl();
    return (
      <CSVLink
        ref={ref}
        headers={headers}
        data={data}
        filename={filename}
        {...props}
        target='_blank'>
        <AntButton disabled={disabled} type='default' icon={<UploadOutlined />}>
          {messages['table.toolbar.exportExcel']}
        </AntButton>
      </CSVLink>
    );
  },
);

ExportCSV.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  filename: PropTypes.string,
  disable: PropTypes.bool,
};

ExportCSV.defaultProps = {
  filename: 'result.csv',
  disable: false,
};
export default ExportCSV;
