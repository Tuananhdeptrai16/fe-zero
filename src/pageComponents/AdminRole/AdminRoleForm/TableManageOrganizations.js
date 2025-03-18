import React from 'react';
import { Button, Col, Form, Row, Table } from 'antd';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { isEmpty } from 'src/shared/utils/Typeof';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';

const TableManageOrganizations = ({ name }) => {
  const form = Form.useFormInstance();
  const organizations = Form.useWatch(name) || form.getFieldValue(name) || [];
  const newOrganization = Form.useWatch('new_organization');
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên hiển thị',
      dataIndex: 'display_name',
      key: 'display_name',
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
  ];

  return (
    <>
      <Row>
        <Col span={16}>
          <FormSelectAsync
            label='Chọn tổ chức vào nhóm quyền'
            name='new_organization'
            fieldNames={{ label: 'display_name', value: 'id' }}
            returnObject
            configFetch={{
              url: API.SELECT_ORGANIZATION,
              method: METHOD_FETCH.POST,
              body: {
                page: 1,
                filters: [
                  {
                    name: 'id',
                    value: organizations.map(
                      (organization) => organization?.id,
                    ),
                    operation: FILTER_OPERATION.NIN,
                  },
                ],
              },
            }}
          />
        </Col>
        <Col span={4}>
          <Button
            disabled={isEmpty(newOrganization)}
            type='primary'
            className='ml-2'
            onClick={() => {
              form.setFieldValue(name, [...organizations, newOrganization]);
              form.setFieldValue('new_organization', null);
            }}
            style={{ marginTop: 30 }}>
            Thêm
          </Button>
        </Col>
      </Row>
      <Table
        rowKey='id'
        scroll={{ y: 250 }}
        style={{ height: '250px' }}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: organizations
            .filter((organization) => organization?.checked !== false)
            .map((organization) => organization?.id),
          onChange: (selectedRowKeys) => {
            form.setFieldValue(
              name,
              organizations.map((organization) => ({
                ...organization,
                checked: selectedRowKeys.includes(organization?.id),
              })),
            );
          },
        }}
        size={'small'}
        columns={columns}
        dataSource={organizations}
        pagination={false}
      />
    </>
  );
};

TableManageOrganizations.propTypes = {};

TableManageOrganizations.defaultProps = {};

export default TableManageOrganizations;
