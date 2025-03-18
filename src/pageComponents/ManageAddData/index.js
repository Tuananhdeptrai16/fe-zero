import React, { useCallback, useState } from 'react';
import DataTable from 'src/@crema/core/DataTable';
import { ADDITIAL_API } from 'src/@crema/services/apis';
import { useIntl } from 'react-intl';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import AntButton from 'src/@crema/component/AntButton';
import { PlusOutlined } from '@ant-design/icons';
import {
  FILTER_OPERATION,
  KEY_ACTION_COLUMN,
} from 'src/shared/constants/DataTable';
import UploadFile from './uploadFile';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import {
  requestDelete,
  updateStatusRequest,
  uploadFileCSV,
} from 'src/@crema/services/db/additial.service';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import Icon from '@ant-design/icons/lib/components/Icon';
import { AcEditIcon, AcTrashIcon } from 'src/assets/icon/action';
import { Button, Empty, Space } from 'antd';
import ConfirmInfo from '../AdminUser/ConfirmInfo';
import AntTag from 'src/@crema/component/AntTag';
import { CATEGORY_ADDITIAL_DATA } from 'src/shared/constants/DataFixed';
import FormCompare from './form_new/FormCompare';
import moment from 'moment';
import FormAchive from './form_achieve';
import { useJWTAuthActions } from 'src/@crema/services/auth/jwt-auth/JWTAuthProvider';
import useCallApi from 'src/@crema/hook/useCallApi';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { isEmpty } from 'src/shared/utils/Typeof';
import { useNavigate } from 'react-router-dom';
import routes from 'src/config/routes.config';
import {
  GET_ADDITIAL_DATA,
  GET_TABLE_DATA,
} from 'src/shared/constants/Resource';
import notification from 'src/shared/utils/notification';

function ContentManageAddData({ category, keyTab, columns, pageName }) {
  const { messages } = useIntl();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogDropdownOpen, setIsDialogDropdownOpen] = useState(false);
  const [statusReq, setStatusReq] = useState();
  const [isShowCompare, setIsShowCompare] = useState(false);
  const [dataOld, setDataOld] = useState();
  const { checkPermissionAction } = useJWTAuthActions();

  const isPermissionApprove = checkPermissionAction(
    pageName,
    ITEM_PERMISSIONS.APPROVE,
  );

  const isPermissionVerify = checkPermissionAction(
    pageName,
    ITEM_PERMISSIONS.VERIFY,
  );

  console.log(columns);
  const uploadFileComponent = (
    <UploadFile
      setIsModalOpen={setIsUploadOpen}
      category={category}
      isPermissionVerify={isPermissionVerify}
    />
  );
  const initTable =
    keyTab == '2'
      ? {
          filters: [
            {
              name: 'category',
              value: category,
              operation: FILTER_OPERATION.EQ,
            },
            {
              name: 'action',
              value: 'IMPORT',
              operation: FILTER_OPERATION.NE,
            },
            {
              name: 'action',
              value: 'FORCE_IMPORT',
              operation: FILTER_OPERATION.NE,
            },
          ],
        }
      : {};
  const { send } = useCallApi({
    success: (data) => {
      setDataOld(data?.result), setIsDialogDropdownOpen(true);
    },
    callApi: (id) =>
      instanceCoreApi.post('/api/v1/admin/additional-data/get-old-data', null, {
        params: { id: id },
      }),
    error: () => {
      notification.error(messages['common.recordDontExist']);
      setDataOld({}), setIsDialogDropdownOpen(true);
    },
  });
  const keysDisplay = {
    [CATEGORY_ADDITIAL_DATA.ACHIEVES]: 'Tên học viện',
    [CATEGORY_ADDITIAL_DATA.INFOR]: 'Tên đơn vị',
    [CATEGORY_ADDITIAL_DATA.LEADERS]: ['Họ đệm', 'Tên'],
    [CATEGORY_ADDITIAL_DATA.TEACHERS]: ['Họ đệm', 'Tên'],
  };
  const onClickBtnStatus = (data, status) => {
    setRowData(data);
    setStatusReq(() => ({
      id: data.id,
      status,
      action: data.action,
      name: data.information_data[keysDisplay[category]],
    }));
    if (data.action === 'UPDATE' && status === 'approve') {
      setIsShowCompare(true);
    } else if (status === 'approve' && data.action === 'DELETE') {
      send(data.id);
    } else {
      setIsDialogDropdownOpen(true);
    }
  };
  const urlEdit = {
    [CATEGORY_ADDITIAL_DATA.INFOR]: routes.manageDataCommonUnit,
    [CATEGORY_ADDITIAL_DATA.LEADERS]: routes.manageLeaders,
    [CATEGORY_ADDITIAL_DATA.TEACHERS]: routes.manageTeachers,
  };
  const columnTool = [
    {
      key: KEY_ACTION_COLUMN,
      fixed: 'right',
      actions: [
        {
          label: 'table.action.edit',
          actionName: ITEM_PERMISSIONS.UPDATE,
          icon: <Icon component={AcEditIcon} />,
          onClick: (data) => {
            setRowData(data);
            if (category === CATEGORY_ADDITIAL_DATA.ACHIEVES) {
              setIsModalOpen(true);
            } else {
              navigate(urlEdit[category] + '/edit/' + data.id, { state: data });
            }
          },
        },
        {
          label: 'table.action.delete',
          actionName: ITEM_PERMISSIONS.DELETE,
          icon: <Icon component={AcTrashIcon} />,
          onClick: (data) => {
            setRowData(data);
            setIsDialogOpen(true);
          },
        },
      ],
    },
  ];
  const columnToolTableAdditional = [
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      width: 150,
      render: (status) => (
        <AntTag
          style={{
            fontSize: '14px',
            lineHeight: '22px',
            color:
              status === 'pending'
                ? '#FAAD14'
                : status === 'reject'
                ? 'black'
                : '#52C41A',
          }}>
          {status === 'pending'
            ? 'Chờ phê duyệt'
            : status === 'reject'
            ? messages['table.button.reject']
            : messages['table.action.approve']}
        </AntTag>
      ),
    },
    {
      title: <IntlMessages id='table.type' />,
      key: 'typeAction',
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (type) => (
        <b>
          {type === 'DELETE' ? 'XÓA' : type === 'ADD' ? 'THÊM MỚI' : 'CẬP NHẬT'}
        </b>
      ),
    },
    {
      key: 'toolbar',
      title: <IntlMessages id='common.action' />,
      width: 180,
      fixed: 'right',
      actionName: ITEM_PERMISSIONS.UPDATE,
      render: (information_data, data) => (
        <>
          {data.status == 'reject' ? (
            <Button type='primary' style={{ border: 0 }} disabled>
              <span>{messages['table.button.reject']}</span>
            </Button>
          ) : data.status == 'pending' ? (
            <>
              <Space>
                <Button
                  onClick={() => onClickBtnStatus(data, 'approve')}
                  type='primary'
                  disabled={!isPermissionApprove}>
                  <span>{messages['table.action.approve']}</span>
                </Button>
                <Button
                  onClick={() => onClickBtnStatus(data, 'reject')}
                  type='primary'
                  danger
                  style={{
                    border: 0,
                  }}
                  disabled={!isPermissionApprove}>
                  <Space>
                    <span>{messages['table.button.reject']}</span>
                  </Space>
                </Button>
              </Space>
            </>
          ) : (
            <Button type='primary' style={{ border: 0 }} disabled>
              <Space>
                <span>{messages['table.action.approve']}</span>
              </Space>
            </Button>
          )}
        </>
      ),
    },
  ];

  columns = columns.filter((item) => item.title !== 'id');
  switch (keyTab) {
    // du lieu
    case '1':
      columns = columns.concat(columnTool);
      break;
    // du lieu bo dung
    case '2':
      columns = columns.concat(columnToolTableAdditional);
      break;
  }

  const dialogCreateRequestComponent = (
    <DialogConfirm
      key={rowData?.id}
      visible={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      textTitle={'confirm.deleteInforTitle'}
      textSuccess={'confirm.deleteInforSuccess'}
      onSaveToServer={() =>
        requestDelete({
          category,
          information_data: { ...rowData, id: rowData?.id },
        })
      }>
      <ConfirmInfo message={'confirm.deleteInforContent'} />
    </DialogConfirm>
  );
  const typeConfirms = {
    approve: {
      ADD: {
        title: 'confirm.updateStatusApproveTitle',
        content: 'confirm.updateStatusApproveContent',
      },
      DELETE: {
        title: 'confirm.deleteStatusApproveTitle',
        content: 'confirm.updateStatusPendingContent',
      },
    },
    reject: {
      ADD: {
        title: 'confirm.rejectUpdateTitle',
        content: 'confirm.createStatusRejectContent',
      },
      DELETE: {
        title: 'confirm.deleteStatusRejectTitle',
        content: 'confirm.deleteStatusRejectContent',
      },
      UPDATE: {
        title: 'confirm.rejectUpdateTitle',
        content: 'confirm.rejectUpdateContent',
      },
    },
  };
  const handleDataBefore = (data) => {
    let dataAfter = { ...data };
    if (isEmpty(dataOld) && statusReq.action === 'DELETE') {
      dataAfter = { ...data, status: 'reject' };
    }
    return dataAfter;
  };
  const dialogApproveComponent = (
    <DialogConfirm
      key={'dialog-confirm-' + rowData?.id}
      visible={isDialogDropdownOpen}
      onClose={() => {
        setIsDialogDropdownOpen(false);
        setDataOld();
      }}
      textTitle={
        statusReq && typeConfirms[statusReq?.status][statusReq?.action]?.title
      }
      textSuccess={
        statusReq?.status === 'approve'
          ? 'confirm.approveSuccess'
          : 'confirm.rejectSuccess'
      }
      textButtonConfirm={
        statusReq?.status === 'approve'
          ? statusReq?.action === 'DELETE' && isEmpty(dataOld)
            ? 'Từ chối'
            : 'table.action.approve'
          : 'Xác nhận'
      }
      onSaveToServer={() => updateStatusRequest(handleDataBefore(statusReq))}>
      {statusReq?.action === 'DELETE' &&
      isEmpty(dataOld) &&
      statusReq?.status === 'approve' ? (
        <div>
          <Empty />
          <p style={{ textAlign: 'center' }}>
            {messages['common.recordDontExist']}
          </p>
        </div>
      ) : (
        <ConfirmInfo
          message={
            statusReq &&
            typeConfirms[statusReq.status][statusReq.action]?.content
          }
          values={{ name: 'này' }}
        />
      )}
    </DialogConfirm>
  );
  const onCloseShowCompare = useCallback(() => {
    setIsShowCompare(false);
  }, []);
  const formCompare = (
    <FormCompare
      category={category}
      onClose={onCloseShowCompare}
      rowData={rowData?.information_data || {}}
      status={rowData?.status}
      id={rowData?.id}
      columns={columns}
    />
  );
  const preSaveData = (data) => {
    let formattedData = {};
    for (let key in data) {
      let value = data[key];
      if (key === 'myIndex') {
        continue;
      } else if (moment.isMoment(value)) {
        formattedData[key] = value.format('DD/MM/YYYY');
      } else {
        formattedData[key] = value || '';
      }
    }
    return rowData
      ? {
          action: 'UPDATE',
          category,
          information_data: { ...formattedData, id: rowData.id },
        }
      : { action: 'ADD', category, information_data: formattedData };
  };
  const navigate = useNavigate();
  const urlCreate = {
    [CATEGORY_ADDITIAL_DATA.INFOR]: routes.createDataCommonUnit,
    [CATEGORY_ADDITIAL_DATA.LEADERS]: routes.createLeaders,
    [CATEGORY_ADDITIAL_DATA.TEACHERS]: routes.createTeachers,
  };

  const btnsToolbar = () => {
    return keyTab == 2
      ? [
          <AntButton
            key={ITEM_PERMISSIONS.ADD}
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => {
              setRowData(null);
              category == CATEGORY_ADDITIAL_DATA.ACHIEVES
                ? setIsModalOpen(true)
                : navigate(urlCreate[category]);
            }}>
            {messages['table.toolbar.addNew']}
          </AntButton>,
          <AntButton
            danger
            key={ITEM_PERMISSIONS.ADD}
            icon={<PlusOutlined />}
            onClick={() => {
              setIsUploadOpen(true);
            }}>
            {messages['button.uploadData']}
          </AntButton>,
        ]
      : [];
  };

  return (
    <>
      <DataTable
        initTable={keyTab == 2 && initTable}
        url={keyTab == 1 ? GET_TABLE_DATA[category] : GET_ADDITIAL_DATA}
        columns={columns || []}
        syncURL={false}
        toolbars={btnsToolbar()}>
        <FormRowDataTable
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={
            rowData ? FORM_TYPES.UPDATE_ADD_DATA : FORM_TYPES.CREATE_ADD_DATA
          }
          resource={ADDITIAL_API.REQUEST_ADDITIAL_DATA}
          method={METHOD_FETCH.POST}
          initialValues={rowData ?? {}}
          preSaveData={(data) => preSaveData(data)}>
          <FormAchive category={category} columns={columns} />
        </FormRowDataTable>
        {isShowCompare && formCompare}
        {dialogCreateRequestComponent}
        {dialogApproveComponent}
        <DialogConfirm
          visible={isUploadOpen}
          layout={'horizontal'}
          onClose={() => setIsUploadOpen(false)}
          textTitle='Tải tập dữ liệu lên'
          textSuccess={
            'Upload file thành công , Vui lòng chờ 1 phút sau đó tải lại'
          }
          textButtonConfirm='Tạo mới'
          onSaveToServer={
            (data) => uploadFileCSV(data, category)
            // setIsUploadOpen(false);
          }>
          {uploadFileComponent}
        </DialogConfirm>
      </DataTable>
    </>
  );
}

export default ContentManageAddData;
