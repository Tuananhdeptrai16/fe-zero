import React, { useEffect } from 'react';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import AppTableContainer from 'src/@crema/core/AppTableContainer';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import AntSwitch from 'src/@crema/component/AntSwitch';
import useCallApi from 'src/@crema/hook/useCallApi';
import {
  putActivateOrganizationPermission,
  putActivateUserPermission,
  putDeactivateOrganizationPermission,
  putDeactivateUserPermission,
} from 'src/@crema/services/permission.service';
import notification from 'src/shared/utils/notification';

const STATUS = {
  ACTIVATE: 'active',
  DEACTIVATE: 'deActive',
};
export const FormSubjectApplication = ({ roleId }) => {
  const [listUser, setListUser] = React.useState([]);
  const [listOrganization, setListOrganization] = React.useState([]);
  const { data } = useFetch(
    {
      url: API.GET_USER_ORG_BY_ROLE_ID(roleId),
    },
    [roleId],
  );
  useEffect(() => {
    if (data?.result) {
      const users = data?.result?.users || [];
      setListUser(users);
      setListOrganization(data?.result?.organizations || []);
    }
  }, [data?.result]);

  const onActivateUserSuccess = () => {
    notification.success('Cho phép nhóm quyền với người dùng thành công');
  };

  const onDeactivateUserSuccess = () => {
    notification.success('Cấm nhóm quyền với người dùng thành công');
  };

  const onActivateOrganizationSuccess = () => {
    notification.success('Cho phép nhóm quyền với tổ chức thành công');
  };

  const onDeactivateOrganizationSuccess = () => {
    notification.success('Cấm nhóm quyền với tổ chức thành công');
  };

  const { send: activateUserMutate, loading: loadingActivateUser } = useCallApi(
    {
      callApi: putActivateUserPermission,
      success: onActivateUserSuccess,
    },
  );
  const { send: deactivateUserMutate, loading: loadingDeactivateUser } =
    useCallApi({
      callApi: putDeactivateUserPermission,
      success: onDeactivateUserSuccess,
    });

  const {
    send: activateOrganizationMutate,
    loading: loadingActivateOrganization,
  } = useCallApi({
    callApi: putActivateOrganizationPermission,
    success: onActivateOrganizationSuccess,
  });
  const {
    send: deactivateOrganizationMutate,
    loading: loadingDeactivateOrganization,
  } = useCallApi({
    callApi: putDeactivateOrganizationPermission,
    success: onDeactivateOrganizationSuccess,
  });

  const onChangeSwitchUser = async (checked, row) => {
    setListUser((prev) =>
      [...prev].map((item) => {
        if (item?.user_id === row?.user_id) {
          return {
            ...item,
            status: checked ? STATUS.ACTIVATE : STATUS.DEACTIVATE,
          };
        }
        return item;
      }),
    );
    if (checked) {
      await activateUserMutate({ user_id: row.user_id, role_id: roleId });
    } else {
      await deactivateUserMutate({ user_id: row.user_id, role_id: roleId });
    }
  };

  const onChangeOrganizationSwitch = async (checked, row) => {
    setListOrganization((prev) =>
      [...prev].map((item) => {
        if (item?.org_id === row?.org_id) {
          return {
            ...item,
            status: checked ? STATUS.ACTIVATE : STATUS.DEACTIVATE,
          };
        }
        return item;
      }),
    );
    if (checked) {
      await activateOrganizationMutate({ org_id: row.org_id, role_id: roleId });
    } else {
      await deactivateOrganizationMutate({
        org_id: row.org_id,
        role_id: roleId,
      });
    }
  };

  const userColumns = [
    {
      title: <IntlMessages id={'table.memberName'} />,
      dataIndex: 'username',
    },
    {
      title: <IntlMessages id={'table.banOrAllow'} />,
      dataIndex: 'status',
      width: 150,
      render: (status, row) => {
        const isActive = status === STATUS.ACTIVATE;
        return (
          <AntSwitch
            value={isActive}
            checkedChildren='Cho phép'
            unCheckedChildren='Cấm'
            onChange={(checked) => onChangeSwitchUser(checked, row)}
            loading={loadingActivateUser || loadingDeactivateUser}
          />
        );
      },
    },
  ];

  const organizationColumns = [
    {
      title: <IntlMessages id={'table.organizationName'} />,
      dataIndex: 'org_name',
    },
    {
      title: <IntlMessages id={'table.banOrAllow'} />,
      width: 150,
      dataIndex: 'status',
      render: (status, row) => {
        const isActive = status === STATUS.ACTIVATE;
        return (
          <AntSwitch
            value={isActive}
            checkedChildren='Cho phép'
            unCheckedChildren='Cấm'
            onChange={(checked) => onChangeOrganizationSwitch(checked, row)}
            loading={
              loadingActivateOrganization || loadingDeactivateOrganization
            }
          />
        );
      },
    },
  ];

  return (
    <div>
      <h5>Danh sách thành viên</h5>
      <AppTableContainer columns={userColumns} data={listUser} />
      <br />
      <h5>Danh sách tổ chức</h5>
      <AppTableContainer
        columns={organizationColumns}
        data={listOrganization}
      />
    </div>
  );
};
