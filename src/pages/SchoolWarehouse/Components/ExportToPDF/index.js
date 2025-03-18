import React from 'react';
import PropTypes from 'prop-types';
import { PrinterOutlined } from '@ant-design/icons';

import useCallApi from 'src/@crema/hook/useCallApi';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { getMessageResponse } from 'src/shared/utils/Service';
import notification from 'src/shared/utils/notification';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';
import AppIconButton from 'src/@crema/core/AppIconButton';
import { useDataTableContext } from 'src/@crema/core/DataTable/DataTableContext';
import { handleRedundantData } from 'src/shared/utils/Object';
import { isEmpty } from 'src/shared/utils/Typeof';

function ExportToPDF({
  type = TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM,
  tableName,
  disabled,
  urlExportPDF,
  ...props
}) {
  const { search } = useDataTableContext();
  const renderBodyGetPDF = () => {
    if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM) {
      return {
        destination_id: props?.destination_id,
        nuclear_region_id: props?.nuclear_region_id,
      };
    }
    if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM) {
      return {
        dtm_region_id: props?.dtm_region_id,
      };
    }
  };

  const { send: exportFile, loading: loadingExportFile } = useCallApi({
    callApi: (data) => {
      return instanceCoreApi.post(data?.url, data?.body, {
        responseType: 'arraybuffer',
      });
    },
    error: (err) => {
      const error = getMessageResponse(err);
      notification.error(error);
    },
    success: (res) => {
      if (res) {
        const url = window.URL.createObjectURL(new Blob([res]), {
          type: 'application/pdf',
        });
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${tableName}-collected-results.pdf`);
        document.body.appendChild(link);
        link.click();
      }
    },
  });

  const handleExportPDF = () => {
    const bodyQuery = {
      filters: [],
      pageable: {
        page: 1,
        page_size: 9999,
      },
      keyword: isEmpty(search) ? '' : handleRedundantData(search),
      table_name: tableName,
      ...renderBodyGetPDF(),
    };
    exportFile({
      url: urlExportPDF,
      body: bodyQuery,
    });
  };

  return (
    <AppIconButton
      key={'export-pdf'}
      loading={loadingExportFile}
      disabled={disabled}
      type='default'
      title={'In'}
      icon={<PrinterOutlined />}
      onClick={handleExportPDF}
    />
  );
}

ExportToPDF.propTypes = {
  tableName: PropTypes.string,
  disabled: PropTypes.bool,
  destination_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  nuclear_region_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ExportToPDF.defaultProps = {
  disabled: false,
};

export default ExportToPDF;
