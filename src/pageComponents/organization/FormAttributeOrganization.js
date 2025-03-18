import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormListKeyValue from 'src/@crema/component/FormListKeyValue';

const FormAttributeOrganization = () => {
  return (
    <div>
      <FormListKeyValue
        label={'Thuộc tính'}
        rootName='attributes'
        renderItem={({ name, restField }) => {
          return (
            <FormInput
              name={[name, 'name']}
              label={'common.attributeName'}
              style={{ width: 250 }}
              required
              {...restField}
            />
          );
        }}
      />
    </div>
  );
};

FormAttributeOrganization.propTypes = {};

FormAttributeOrganization.defaultProps = {};

export default FormAttributeOrganization;
