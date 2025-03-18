import React from 'react';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';

import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { Tag } from 'antd';
export const FormDetailOrganizationModal = ({ organizationId }) => {
  return (
    <div>
      <FormSelectAsync
        label='sidebar.listMember_organization'
        placeholder={'Tìm kiếm theo email của thành viên'}
        name='user_ids'
        showArrow
        mode='multiple'
        fieldNames={{ value: 'id' }}
        configFetch={{
          url: API.GET_LIST_USER_WITHOUT_ORGANIZATION(organizationId),
          method: METHOD_FETCH.POST,
          body: {
            keyword: null,
            filters: [],
            pageable: {
              page: 1,
            },
          },
        }}
        required
        renderItem={(option, index) => {
          return (
            <div key={`item-${index}`}>
              {RenderNameUser({ user: option })}{' '}
              {option.email && <Tag>{option.email}</Tag>}
            </div>
          );
        }}
      />
    </div>
  );
};
