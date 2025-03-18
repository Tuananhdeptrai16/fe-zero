import React from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import ContentManageAddData from 'src/pageComponents/ManageAddData';
import { Tabs } from 'antd';
import { CATEGORY_ADDITIAL_DATA } from 'src/shared/constants/DataFixed';
import ItemValueColumn from '../ItemColumn';
import { ROUTER_NAME } from 'src/pages/routeConfig';

function ManageTeachers() {
  const { messages } = useIntl();
  const category = CATEGORY_ADDITIAL_DATA.TEACHERS;
  const fields = [
    { title: 'id', dataIndex: 'id' },
    { title: 'Số hiệu', dataIndex: 'Mã cán bộ' },
    { title: 'Tên lãnh đạo', dataIndex: ['Họ đệm', 'Tên'] },
    { title: 'Đơn vị trực thuộc', dataIndex: 'Đơn vị trực thuộc' },
    { title: 'Chức vụ', dataIndex: 'Chức vụ' },
    { title: 'Bộ tỉnh', dataIndex: 'Bộ tỉnh' },
  ];

  const columns = fields.map((field) => ({
    title: field.title,
    dataIndex: field.dataIndex,
    width: 200,
    render: (_, data) => {
      let value;
      if (Array.isArray(field.dataIndex)) {
        value = '';
        for (const dataIndex of field.dataIndex) {
          const name = data?.[dataIndex] || data?.information_data?.[dataIndex];
          value += ' ' + name;
        }
      } else {
        value =
          data?.information_data?.[field.dataIndex] || data?.[field.dataIndex];
      }

      return <ItemValueColumn value={value} />;
    },
  }));

  columns.unshift({
    title: 'id',
    dataIndex: 'id',
    width: 200,
    render: (_, data) => {
      let value = data?.information_data?.id || data?.id;
      return <ItemValueColumn value={value} />;
    },
  });

  // const [showForm, setshowForm] = useState({ show: false, data: null });

  const items = [
    {
      key: '2',
      label: 'Dữ liệu bổ sung',
      children: (
        <ContentManageAddData
          category={category}
          keyTab='2'
          columns={columns}
          pageName={ROUTER_NAME.MANAGE_TEACHERS}
        />
      ),
    },
    {
      key: '1',
      label: 'Dữ liệu',
      children: (
        <ContentManageAddData
          category={category}
          keyTab='1'
          columns={columns}
        />
      ),
    },
  ];

  return (
    <>
      <AppPageMetadata title={messages['sidebar.manage_teachers']} />
      {/* {showForm.show ? (
        <WrapperFormAddingData
          title={showForm.data ? 'Chỉnh sửa' : 'Thêm mới'}
          setshowForm={setshowForm}
          category={category}
          initialValues={showForm.data}
          rowData={showForm.data}
          action={showForm.data ? 'UPDATE' : 'ADD'}
          resource={ADDITIAL_API.REQUEST_ADDITIAL_DATA}
        />
      ) : (
        <Tabs
          defaultActiveKey='2'
          items={items}
          destroyInactiveTabPane={true}
        />
      )} */}
      <Tabs defaultActiveKey='2' items={items} destroyInactiveTabPane={true} />
    </>
  );
}
export default ManageTeachers;
