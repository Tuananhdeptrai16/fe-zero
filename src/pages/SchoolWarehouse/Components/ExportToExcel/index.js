import React from 'react';
import PropTypes from 'prop-types';
import { UploadOutlined } from '@ant-design/icons';
import AntButton from 'src/@crema/component/AntButton';
import useCallApi from 'src/@crema/hook/useCallApi';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { getMessageResponse } from 'src/shared/utils/Service';
import notification from 'src/shared/utils/notification';
import { useIntl } from 'react-intl';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';
import { useDataTableContext } from 'src/@crema/core/DataTable/DataTableContext';
import { isEmpty } from 'src/shared/utils/Typeof';
import { handleRedundantData } from 'src/shared/utils/Object';

function ExportToExcel({
  type = TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM,
  tableName,
  disabled,
  urlExportExcel,
  ...props
}) {
  const { messages } = useIntl();

  const { search } = useDataTableContext();

  const renderBodyGetExcel = () => {
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

  // const propIdMapping = {
  //   destination_id: props?.destination_id,
  //   nuclear_region_id: props?.nuclear_region_id,
  // };

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
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${tableName}-collected-results.xlsx`);
        document.body.appendChild(link);
        link.click();
        notification.success('Xuất file excel thành công!');
      }
    },
  });
  const handleExportExcel = () => {
    const bodyQuery = {
      filters: [],
      pageable: {
        page: 1,
        page_size: 9999,
      },
      keyword: isEmpty(search) ? '' : handleRedundantData(search),
      table_name: tableName,
      ...renderBodyGetExcel(),
    };
    exportFile({
      url: urlExportExcel,
      body: bodyQuery,
    });
  };
  return (
    <AntButton
      key={'export-excel-xlsx'}
      loading={loadingExportFile}
      disabled={disabled}
      type='default'
      icon={<UploadOutlined />}
      onClick={handleExportExcel}>
      {messages['table.toolbar.exportExcel']}
    </AntButton>
  );
}

ExportToExcel.propTypes = {
  tableName: PropTypes.string,
  disabled: PropTypes.bool,
  destination_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  nuclear_region_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ExportToExcel.defaultProps = {
  disabled: false,
};
export default ExportToExcel;
