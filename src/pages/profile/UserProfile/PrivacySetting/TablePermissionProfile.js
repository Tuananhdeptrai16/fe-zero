import React from 'react';
import DataTable from 'src/@crema/core/DataTable';
import API from 'src/@crema/services/apis';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import IntlMessages from 'src/@crema/utility/IntlMessages';

export const TablePermissionProfile = () => {
  const { user } = useAuthUser();
  const columns = [
    {
      title: <IntlMessages id='table.permissionCode' />,
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: <IntlMessages id='table.displayName' />,
      dataIndex: 'display_name',
      key: 'display_name',
      width: 200,
    },
    // {
    //   title: <IntlMessages id='table.description' />,
    //   dataIndex: 'description',
    //   key: 'description',
    //   width: 200,
    //   fixed: 'right',
    // },
  ];
  return (
    <div className={'tablePermissionProfile'}>
      <DataTable
        initTable={{
          body: {
            user_id: user?.id,
          },
        }}
        url={API.GET_LIST_ADMIN_PERMISSIONS}
        columns={columns}
        isShowHeaderTable={false}
      />
    </div>
  );
};
