import React from 'react';
import { FormSettingTable } from 'src/pageComponents/formSetting/FormSettingTable';
import {
  GROUP_TYPE_RELATE_DOCUMENT,
  THA_ID,
} from 'src/shared/constants/DataFixed';

const FormSettingExecutionJudgment = () => {
  return (
    <FormSettingTable
      organizationId={THA_ID}
      groupType={GROUP_TYPE_RELATE_DOCUMENT}
    />
  );
};

FormSettingExecutionJudgment.propTypes = {};

FormSettingExecutionJudgment.defaultProps = {};

export default FormSettingExecutionJudgment;
