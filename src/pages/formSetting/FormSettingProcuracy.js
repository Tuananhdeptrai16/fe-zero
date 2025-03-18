import React from 'react';
import { FormSettingTable } from 'src/pageComponents/formSetting/FormSettingTable';
import {
  GROUP_TYPE_RELATE_DOCUMENT,
  VKS_ID,
} from 'src/shared/constants/DataFixed';

const FormSettingProcuracy = () => {
  return (
    <FormSettingTable
      organizationId={VKS_ID}
      groupType={GROUP_TYPE_RELATE_DOCUMENT}
    />
  );
};

FormSettingProcuracy.propTypes = {};

FormSettingProcuracy.defaultProps = {};

export default FormSettingProcuracy;
