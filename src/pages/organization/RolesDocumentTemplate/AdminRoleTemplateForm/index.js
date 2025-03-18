import React from 'react';
import PropTypes from 'prop-types';
import './permission_form.styles.less';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import FormTreeTemplateRole from '../FormTreeTemplateRole';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import { AppLoader } from 'src/@crema';

const AdminRoleTemplateForm = ({
  roleName,
  idOrganization,
  isSearchTemplateDepartment = false,
  idOrganizationSearchByDepartment,
}) => {
  const { isLoading, data } = useFetch({
    url: isSearchTemplateDepartment
      ? API.GET_LIST_DOCUMENT_TEMPLATE_BY_DEPARTMENT
      : API.GET_LIST_DOCUMENT_TEMPLATE_BY_ORGANIZATION,
    method: METHOD_FETCH.POST,
    body: {
      filters: [
        {
          name: isSearchTemplateDepartment
            ? 'department_id'
            : 'organization_id',
          operation: 'eq',
          value: idOrganization,
        },
      ],
      pageable: {
        page: 1,
        page_size: 1000,
        sort: [
          {
            property: 'id',
            direction: 'desc',
          },
        ],
      },
    },
  });

  const initCheckboxTemplateByOrganization = data
    ? data?.result?.items?.map((item) => {
        return item?.document_template_id;
      })
    : [];

  if (isLoading || !data) {
    return <AppLoader />;
  }
  return (
    <div>
      <h4>
        <IntlMessages id='form.organizeDepartments' /> :{' '}
        <span className='warning-text-color'>{roleName}</span>
      </h4>
      <FormTreeTemplateRole
        name={'document_template_ids'}
        initCheckboxTemplateByOrganization={initCheckboxTemplateByOrganization}
        isSearchTemplateDepartment={isSearchTemplateDepartment}
        idOrganizationSearchByDepartment={idOrganizationSearchByDepartment}
      />
    </div>
  );
};

export default AdminRoleTemplateForm;

AdminRoleTemplateForm.propTypes = {
  roleName: PropTypes.string,
};
