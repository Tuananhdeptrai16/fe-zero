import React, { useMemo } from 'react';
import { Checkbox, Space, Table } from 'antd';
import { isEmpty } from 'src/shared/utils/Typeof';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { DEFAULT_PERMISSION_SELECT } from 'src/shared/constants/DataSelect';
import AppLoader from '../../core/AppLoader';

const TreePermissionRole = ({ value: initValue = [], onChange }) => {
  const { isLoading, data } = useFetch({
    url: API.GET_ALL_PERMISSIONS,
    method: METHOD_FETCH.GET,
  });

  const displayPermissionName = (name) => {
    if (name === 'view') return 'Xem';
    if (name === 'add') return 'Thêm';
    if (name === 'edit') return 'Sửa';
    if (name === 'delete') return 'Xóa';
    if (name === 'setting') return 'Cài đặt';
    if (name === 'approve') return 'Phê duyệt';
    if (name === 'verify') return 'Bỏ yêu cầu duyệt';
    return name;
  };

  const listRow =
    useMemo(() => {
      const allPermission = data?.result || [];

      if (allPermission) {
        const listPagePermission = DEFAULT_PERMISSION_SELECT(allPermission);
        console.log(listPagePermission);
        return listPagePermission
          .map((item) => {
            if (isEmpty(item?.options)) {
              if (!isEmpty(item?.permissions)) {
                return { ...item, isChild: true };
              }
              return item;
            }
            const options = item?.options?.map((option) => ({
              ...option,
              isChild: true,
            }));
            return [item, ...options];
          })
          .flat();
      }
      return [];
    }, [data?.result]) || [];

  const columns = [
    {
      title: 'Tên chính sách',
      dataIndex: 'name',
      key: 'name',
      width: 400,
      render: (value, item) => {
        // console.log(item);
        if (item?.level === 1) {
          return <span>{item?.label}</span>;
        }
        if (item?.level === 2) {
          return <div style={{ marginLeft: '1.2rem' }}>{item?.label}</div>;
        }
        if (item?.level === 3) {
          return <div style={{ marginLeft: '2.4rem' }}>{item?.label}</div>;
        }
        if (item?.level === 4) {
          return <div style={{ marginLeft: '3.6rem' }}>{item?.label}</div>;
        }
        if (item?.level === 5) {
          return <div style={{ marginLeft: '4.8rem' }}>{item?.label}</div>;
        }
        // if (item?.isChild) {
        //   return (
        //     <div style={{ marginLeft: '1.6rem' }}>
        //       {item?.label}
        //       {item?.isPageHidden && (
        //         <Tag style={{ marginLeft: '0.4rem' }}>Trang ẩn</Tag>
        //       )}
        //     </div>
        //   );
        // }
        // return <span>{item?.label}</span>;
      },
    },
    {
      title: 'Phân quyền',
      dataIndex: 'permission',
      key: 'permission',
      render: (value, item) => {
        if (!isEmpty(item?.permissions)) {
          const permissionIds = item?.permissions.map((item) => item?.id);
          return (
            <>
              <Checkbox.Group
                defaultValue={initValue}
                value={initValue}
                onChange={(newPermission) => {
                  const newValue = initValue.filter(
                    (permissionId) => !permissionIds.includes(permissionId),
                  );
                  onChange([...newValue, ...newPermission]);
                }}>
                <Space size={[20, 8]}>
                  {(item?.permissions || []).map((option) => {
                    console.log(option);
                    return (
                      <Checkbox
                        value={option?.id}
                        key={`permission-${option?.id}`}>
                        {displayPermissionName(option?.name)}
                      </Checkbox>
                    );
                  })}
                </Space>
              </Checkbox.Group>
            </>
          );
        } else if (isEmpty(item?.isChild) && item?.options?.length > 0) {
          const listAllPermissions = item?.options?.map((item) => {
            return item?.permissions?.map((permission) => {
              return permission?.id;
            });
          });
          const listPermissionFlat = [...listAllPermissions?.flat()];
          const checkedSelectAll = listPermissionFlat.every((permission) =>
            initValue.includes(permission),
          );

          return (
            <Checkbox
              checked={checkedSelectAll}
              onChange={(e) => {
                const checked = e?.target?.checked;
                if (checked) {
                  const listNewPermissionChecked = new Set([
                    ...listPermissionFlat,
                    ...initValue,
                  ]);
                  onChange([...listNewPermissionChecked]);
                } else {
                  const newChecked = initValue?.filter((item) => {
                    return !listPermissionFlat?.includes(item);
                  });
                  const filterDuplicate = new Set(newChecked);
                  onChange([...filterDuplicate]);
                }
              }}>
              Chọn tất cả quyền
            </Checkbox>
          );
        } else {
          return <></>;
        }
      },
    },
  ];

  if (isLoading || !data) {
    return <AppLoader />;
  }

  return (
    <Table
      size={'small'}
      columns={columns}
      dataSource={listRow}
      pagination={false}
      scroll={{ x: 'max-content' }}
      sticky={{
        offsetHeader: -24,
      }}
    />
  );
};

TreePermissionRole.propTypes = {};

TreePermissionRole.defaultProps = {};

export default TreePermissionRole;
