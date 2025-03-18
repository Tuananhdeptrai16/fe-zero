import React from 'react';
import { FormSettingTable } from 'src/pageComponents/formSetting/FormSettingTable';
import { GROUP_TYPE_RELATE_DOCUMENT } from 'src/shared/constants/DataFixed';

const FormSettingDecisionJudiciary = () => {
  return (
    <FormSettingTable
      groupType={GROUP_TYPE_RELATE_DOCUMENT}
      organizationId={GROUP_TYPE_RELATE_DOCUMENT}
    />
  );
};

FormSettingDecisionJudiciary.propTypes = {};

FormSettingDecisionJudiciary.defaultProps = {};

export default FormSettingDecisionJudiciary;
