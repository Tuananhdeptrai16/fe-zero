import React from 'react';
import { useIntl } from 'react-intl';
import DATA_PROVINCE from 'src/shared/constants/tinh_tp.json';
import DATA_DICTRICT from 'src/shared/constants/quan_huyen.json';
import DATA_WARD from 'src/shared/constants/xa_phuong.json';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import ContentManageAddData from 'src/pageComponents/ManageAddData';
import { Tabs } from 'antd';
import { CATEGORY_ADDITIAL_DATA } from 'src/shared/constants/DataFixed';
import ItemValueColumn from '../ItemColumn';
import { ROUTER_NAME } from 'src/pages/routeConfig';
// import moment from 'moment';
// import { DATE } from 'src/shared/constants/Format';

function InforCommon() {
  const { messages } = useIntl();
  const category = CATEGORY_ADDITIAL_DATA.INFOR;
  const fields = [
    { title: 'Loại hình đơn vị', dataIndex: 'Loại hình đơn vị' },
    { title: 'Mã đơn vị', dataIndex: 'Mã đơn vị' },
    { title: 'Tên đơn vị', dataIndex: 'Tên đơn vị' },
    { title: 'Số điện thoại', dataIndex: 'Số điện thoại' },
    { title: 'Địa chỉ email', dataIndex: 'Địa chỉ email' },
    { title: 'Mã số thuế', dataIndex: 'Mã số thuế' },
    {
      title: 'Mã đơn vị sử dụng ngân sách',
      dataIndex: 'Mã đơn vị sử dụng ngân sách',
    },
    { title: 'VB ban hành/VB sửa đổi', dataIndex: 'VB ban hành' },
    { title: 'Ngày ban hành văn bản', dataIndex: 'Ngày ban hành văn bản' },
    { title: 'CQ ban hành văn bản', dataIndex: 'CQ ban hành văn bản' },
    { title: 'Ngày hiệu lực từ', dataIndex: 'Ngày hiệu lực từ' },
    { title: 'Ngày hiệu lực đến', dataIndex: 'Ngày hiệu lực đến' },
    { title: 'Trạng thái', dataIndex: 'Trạng thái' },
  ];

  const columns = fields.map((field) => ({
    title: field.title,
    dataIndex: field.dataIndex,
    width: 200,
    render: (_, data) => {
      let value =
        data?.information_data?.[field.dataIndex] || data?.[field.dataIndex];
      if (field.dataIndex === 'Tỉnh') {
        const provice = Object.values(DATA_PROVINCE).find(
          (item) => item.code === value,
        );
        value = provice?.name_with_type;
      } else if (field.dataIndex === 'Quận huyện') {
        const dictrict = Object.values(DATA_DICTRICT).find(
          (item) => item.code === value,
        );
        value = dictrict?.name_with_type;
      } else if (field.dataIndex === 'Phường') {
        const ward = Object.values(DATA_WARD).find(
          (item) => item.code === value,
        );
        value = ward?.name_with_type;
      } else if (
        field.dataIndex === 'Ngày ban hành văn bản' ||
        field.dataIndex === 'Ngày hiệu lực từ' ||
        field.dataIndex === 'Ngày hiệu lực đến'
      ) {
        value = value && value !== '' ? value : '';
        // value = value && value !== '' ? moment(value).format(DATE) : '-';
        // value = value === '' ? '-' : value;
      }

      return <ItemValueColumn value={value} />;
    },
  }));

  // If you need to include additional columns that are not part of the `fields` array, you can add them manually:
  columns.unshift({
    title: 'id',
    dataIndex: 'id',
    width: 200,
    render: (_, data) => {
      let value = data?.information_data?.id || data?.id;
      return <ItemValueColumn value={value} />;
    },
  });

  const items = [
    {
      key: '2',
      label: 'Dữ liệu bổ sung',
      children: (
        <ContentManageAddData
          category={category}
          keyTab='2'
          columns={columns}
          pageName={ROUTER_NAME.MANAGE_DATA_COMMON_UNIT}
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
      <AppPageMetadata title={messages['sidebar.manage_data_common_unit']} />
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
export default InforCommon;
