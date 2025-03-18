import React from 'react';
import FormSelect from 'src/@crema/core/Form/FormSelect/index';
import FormList from 'src/@crema/core/Form/FormList';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import { CITIZEN_RELATIONS } from 'src/shared/constants/DataTable';

export const FormCitizenRelationModal = () => {
  return (
    <div>
      <p>
        Thông tin thân nhân của đối tượng:
        <span className='warning-text-color'> {name}</span>
      </p>
      <FormList
        name='relations'
        label='table.citizenRelation'
        required
        renderFormItemTitle={({ index }) => {
          return <span>Thân nhân {index + 1}</span>;
        }}
        renderFormItem={({ name }) => {
          return (
            <>
              <FormSelect
                name={[name, 'relation']}
                options={CITIZEN_RELATIONS}
                required
                placeholder={'Mối quan hệ'}
              />
              <FormSelectAsync
                label='Công dân'
                name={[name, 'citizen']}
                fieldNames={{ label: 'name', value: 'id' }}
                configFetch={{
                  url: API.BUSINESS_ACTIVITY_SELECT,
                  method: METHOD_FETCH.POST,
                  body: {
                    keyword: null,
                    page: 1,
                  },
                }}
              />
            </>
          );
        }}
      />
    </div>
  );
};
