import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { GENDER_LIST } from 'src/shared/constants/DataTable';
import FormDateText from 'src/@crema/component/FormDateText';

const FormCitizenShortInformation = ({ field }) => {
  return (
    <div>
      <FormInput
        label='table.citizenFullName'
        name={[field?.name, 'full_name']}
        required
      />
      <FormInput
        label='table.citizenOtherName'
        name={[field?.name, 'other_name']}
      />
      <FormSelect
        label='table.citizenGender'
        name={[field?.name, 'gender']}
        options={GENDER_LIST}
      />
      <FormDateText
        label='table.citizenDateOfBirth'
        name={[field?.name, 'date_of_birth']}
        rules={{ date_birth_text: [] }}
      />
      <FormInput
        label='table.citizenPlaceOfBirth'
        name={[field?.name, 'place_of_birth']}
      />
      <FormInput
        label='table.citizenPermanentAddress'
        name={[field?.name, 'permanent_address']}
      />
      <FormInput
        label='table.citizenFatherFullName'
        name={[field?.name, 'father_name']}
      />
      <FormDateText
        label='table.citizenFatherDateOfBirth'
        name={[field?.name, 'father_yob']}
        rules={{ date_text: [] }}
      />
      <FormInput
        label='table.citizenMotherFullName'
        name={[field?.name, 'mother_name']}
      />
      <FormDateText
        label='table.citizenMotherDateOfBirth'
        name={[field?.name, 'mother_yob']}
        rules={{ date_text: [] }}
      />
    </div>
  );
};

FormCitizenShortInformation.propTypes = {};

FormCitizenShortInformation.defaultProps = {};

export default FormCitizenShortInformation;
