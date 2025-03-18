import React, { useState } from 'react';
import DataTable from 'src/@crema/core/DataTable';
import API from 'src/@crema/services/apis';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { renderSample } from 'src/pages/judicialRecords/createRecordInformation/utils';
import {
  GENDER_MAPPING,
  KEY_ACTION_COLUMN,
} from 'src/shared/constants/DataTable';
import { RenderDate } from 'src/@crema/component/TableRender';
import { PrinterOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import { FormPrintJudicialRecord } from 'src/pageComponents/judicialRecords/FormPrintJudicialRecord';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import Link from 'src/@crema/component/Link';
import config from 'src/config';

export const TableJucidialRecordInfo = ({ filters }) => {
  const { messages } = useIntl();
  const [listPdf, setListPdf] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const columns = [
    {
      title: <IntlMessages id='common.name' />,
      dataIndex: 'citizen_profile',
      width: 200,
      key: 'name',
      fixed: 'left',
      render: (row) => (
        <Link to={config.routes.detailJudicialRecordBDW(row?.id)}>
          {row?.full_name}
        </Link>
      ),
    },
    {
      title: <IntlMessages id='judicial.idCard' />,
      dataIndex: 'citizen_profile',
      width: 200,
      key: 'cccd',
      render: (row) => row?.cccd_number,
    },
    {
      title: <IntlMessages id='common.gender' />,
      dataIndex: 'citizen_profile',
      width: 200,
      key: 'gender',
      render: (row) => {
        return GENDER_MAPPING[row?.gender] || row?.gender;
      },
    },
    {
      title: <IntlMessages id='common.birthday' />,
      dataIndex: 'citizen_profile',
      width: 200,
      key: 'birthday',
      align: 'center',
      render: (row) => <RenderDate value={row?.date_of_birth} />,
    },
    {
      title: <IntlMessages id='table.citizenNationality' />,
      dataIndex: 'citizen_profile',
      width: 120,
      key: 'nationality',
      render: (row) => row?.nationality,
    },
    {
      title: <IntlMessages id='judicial.sampleForm' />,
      dataIndex: 'citizen_profile',
      width: 200,
      key: 'sample',
      render: (row) => renderSample(row?.profile_type),
    },
    {
      key: KEY_ACTION_COLUMN,
      actions: [
        {
          label: 'table.action.print',
          icon: <PrinterOutlined style={{ color: '#000000' }} />,
          onClick: (data) => {
            setRowData(data);
            setListPdf([
              { value: data?.link_lltp, label: 'Hồ sơ LLTP' },
              { value: data?.link_sample1, label: 'Mẫu phiếu LLTP số 1' },
              { value: data?.link_sample2, label: 'Mẫu phiếu LLTP số 2' },
            ]);
            setIsDialogOpen(true);
          },
        },
      ],
    },
  ];

  return (
    <div>
      <AppPageMetadata title={messages['sidebar.judicial_record.list']} />
      <DataTable
        url={API.SEARCH_LIST_JUDICIAL_RECORD}
        columns={columns}
        filters={filters}>
        <DialogConfirm
          visible={isDialogOpen}
          size={'large'}
          initialValues={{ link: rowData?.link_lltp }}
          textTitle={'judicial.print'}
          onClose={() => setIsDialogOpen(false)}>
          <FormPrintJudicialRecord
            listPdf={listPdf.filter((item) => item?.value)}
          />
        </DialogConfirm>
      </DataTable>
    </div>
  );
};
