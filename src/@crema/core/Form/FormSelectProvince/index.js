import React from 'react';
import { AREA_API } from 'src/@crema/services/apis';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';

const FormSelectProvince = ({
  layout,
  areaId: areaIdProps,
  isForm,
  ...attrs
}) => {
  const { user = {} } = useAuthUser();
  const areaId = user?.area?.id;
  const province = user?.province;
  const provinceId = user?.province?.id;

  if (isForm && province) {
    return (
      <FormSelect
        fieldNames={{ label: 'name', value: 'id' }}
        layout={layout}
        label={'table.project.province'}
        name='province_id'
        options={[province]}
        {...attrs}
      />
    );
  }

  if (provinceId) {
    return null;
  }

  const areaIdQuery = areaId || areaIdProps;

  return (
    <FormSelect
      fieldNames={{ label: 'name', value: 'id' }}
      layout={layout}
      label={'table.project.province'}
      name='province_id'
      configFetch={{
        url: areaIdQuery
          ? `${AREA_API.GET_LIST_PROVINCE}/${areaIdQuery}`
          : AREA_API.GET_LIST_PROVINCE,
      }}
      deps={[areaIdQuery]}
      {...attrs}
    />
  );
};

FormSelectProvince.propTypes = {};

FormSelectProvince.defaultProps = {};

export default FormSelectProvince;
