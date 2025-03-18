import React from 'react';
import { FormSettingTable } from 'src/pageComponents/formSetting/FormSettingTable';
import {
  GROUP_TYPE_RELATE_DOCUMENT,
  TA_ID,
} from 'src/shared/constants/DataFixed';

const FormSettingCourt = () => {
  return (
    <FormSettingTable
      organizationId={TA_ID}
      groupType={GROUP_TYPE_RELATE_DOCUMENT}
    />
  );
};

FormSettingCourt.propTypes = {};

FormSettingCourt.defaultProps = {};

export default FormSettingCourt;
