import React from 'react';
import { FormSettingTable } from 'src/pageComponents/formSetting/FormSettingTable';
import {
  CA_ID,
  GROUP_TYPE_RELATE_DOCUMENT,
} from 'src/shared/constants/DataFixed';

const FormSettingPolice = () => {
  return (
    <FormSettingTable
      organizationId={CA_ID}
      groupType={GROUP_TYPE_RELATE_DOCUMENT}
    />
  );
};

FormSettingPolice.propTypes = {};

FormSettingPolice.defaultProps = {};

export default FormSettingPolice;
