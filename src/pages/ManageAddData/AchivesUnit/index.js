import React from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import ContentManageAddData from 'src/pageComponents/ManageAddData';
import { Tabs } from 'antd';
import { CATEGORY_ADDITIAL_DATA } from 'src/shared/constants/DataFixed';
import ItemValueColumn from '../ItemColumn';
import { ROUTER_NAME } from 'src/pages/routeConfig';

function AchivesUnit() {
  const { messages } = useIntl();
  const category = CATEGORY_ADDITIAL_DATA.ACHIEVES;

  const fields = [
    {
      title: 'Tên học viện',
      dataIndex: 'Tên học viện',
      maxLength: 128,
      required: true,
    },
    {
      title: 'Thành tích đạt được',
      dataIndex: 'Thành tích đạt được',
      maxLength: 255,
    },
    { title: 'Số quyết định', dataIndex: 'Số quyết định', maxLength: 32 },
    { title: 'Ngày quyết định', dataIndex: 'Ngày quyết định' },
    { title: 'Người kí', dataIndex: 'Người kí', maxLength: 128 },
  ];

  const columns = fields.map((field) => ({
    title: field.title,
    dataIndex: field.dataIndex,
    width: 200,
    required: field.required,
    maxLength: field.maxLength,
    render: (_, data) => {
      let value =
        data?.information_data?.[field.dataIndex] || data?.[field.dataIndex];
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

  const items = [
    {
      key: '2',
      label: 'Dữ liệu bổ sung',
      children: (
        <ContentManageAddData
          category={category}
          keyTab='2'
          columns={columns}
          pageName={ROUTER_NAME.MANAGE_ACHIEVES_UNIT}
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
          pageName={ROUTER_NAME.MANAGE_ACHIEVES_UNIT}
        />
      ),
    },
  ];
  return (
    <>
      <AppPageMetadata title={messages['sidebar.manage_achieves_unit']} />
      <Tabs defaultActiveKey='2' items={items} destroyInactiveTabPane={true} />
    </>
  );
}
export default AchivesUnit;
