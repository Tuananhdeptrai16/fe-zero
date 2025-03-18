import React from 'react';
import { AREA_API } from 'src/@crema/services/apis';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';

const FormSelectArea = ({ layout, isForm, ...attrs }) => {
  const { user = {} } = useAuthUser();
  const area = user?.area;
  const areaId = user?.area?.id;

  if (isForm && area) {
    return (
      <FormSelect
        fieldNames={{ label: 'name', value: 'id' }}
        layout={layout}
        label={'table.investor.area'}
        name='area_id'
        options={[area]}
        {...attrs}
      />
    );
  }

  if (areaId) {
    return null;
  }

  return (
    <FormSelect
      fieldNames={{ label: 'name', value: 'id' }}
      layout={layout}
      label={'table.investor.area'}
      name='area_id'
      configFetch={{
        url: AREA_API.GET_LIST_AREA,
      }}
      {...attrs}
    />
  );
};

FormSelectArea.propTypes = {};

FormSelectArea.defaultProps = {};

export default FormSelectArea;
