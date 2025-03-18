import React from 'react';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import DataTable from 'src/@crema/core/DataTable';
import API from 'src/@crema/services/apis';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';

export const TableGroupPermissionProfile = () => {
  const { user } = useAuthUser();

  const columns = [
    {
      title: <IntlMessages id='table.groupCode' />,
      dataIndex: 'name',
      width: 200,
      key: 'name',
    },
    {
      title: <IntlMessages id='table.description' />,
      dataIndex: 'description',
      key: 'description',
      width: 300,
    },
  ];
  return (
    <div className={'tablePermissionProfile'}>
      <DataTable
        url={API.GET_LIST_ADMIN_ROLE}
        columns={columns}
        initTable={{
          body: {
            user_id: user?.id,
          },
        }}
        isShowHeaderTable={false}
      />
    </div>
  );
};
