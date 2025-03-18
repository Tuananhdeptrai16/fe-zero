import React from 'react';
import { Button, Col, Form, Row, Table, Typography } from 'antd';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { isEmpty } from 'src/shared/utils/Typeof';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';

const TableManageMembers = ({ name }) => {
  const form = Form.useFormInstance();
  const members = Form.useWatch(name) || form.getFieldValue(name) || [];
  const newUser = Form.useWatch('new_user');
  console.log('newUser', newUser);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        return <RenderNameUser user={record} />;
      },
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  return (
    <>
      <Row>
        <Col span={16}>
          <FormSelectAsync
            label='Chọn thành viên vào nhóm quyền'
            name='new_user'
            fieldNames={{ label: 'email', value: 'id' }}
            returnObject
            renderItem={(option, index) => {
              return (
                <div key={`item-${index}`}>
                  <RenderNameUser user={option} />
                  <Typography.Text type='secondary' className='ml-2'>
                    {option?.email}
                  </Typography.Text>
                </div>
              );
            }}
            configFetch={{
              url: API.SELECT_USER,
              method: METHOD_FETCH.POST,
              body: {
                page: 1,
                filters: [
                  {
                    name: 'id',
                    value: members.map((member) => member?.id),
                    operation: FILTER_OPERATION.NIN,
                  },
                ],
              },
            }}
          />
        </Col>
        <Col span={4}>
          <Button
            disabled={isEmpty(newUser)}
            type='primary'
            className='ml-2'
            onClick={() => {
              form.setFieldValue(name, [...members, newUser]);
              form.setFieldValue('new_user', null);
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
          selectedRowKeys: members
            .filter((member) => member?.checked !== false)
            .map((member) => member?.id),
          onChange: (selectedRowKeys) => {
            form.setFieldValue(
              name,
              members.map((member) => ({
                ...member,
                checked: selectedRowKeys.includes(member?.id),
              })),
            );
          },
        }}
        size={'small'}
        columns={columns}
        dataSource={members}
        pagination={false}
      />
    </>
  );
};

TableManageMembers.propTypes = {};

TableManageMembers.defaultProps = {};

export default TableManageMembers;
