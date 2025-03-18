import React from 'react';
import PropTypes from 'prop-types';
import './permission_form.styles.less';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import FormTreePermissionRole from 'src/@crema/core/Form/FormTreePermissionRole';

const AdminRolePermissionForm = ({ roleName }) => {
  return (
    <div>
      <h4>
        <IntlMessages id='form.groupUser' /> :{' '}
        <span className='warning-text-color'>{roleName}</span>
      </h4>
      <FormTreePermissionRole name={'permission_ids'} />
    </div>
  );
};

export default AdminRolePermissionForm;

AdminRolePermissionForm.propTypes = {
  roleName: PropTypes.string,
};
