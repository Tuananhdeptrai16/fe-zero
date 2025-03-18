import React from 'react';
import { FormSettingTable } from 'src/pageComponents/formSetting/FormSettingTable';
import { GROUP_TYPE_VERDICT } from 'src/shared/constants/DataFixed';

const FormSettingVerdict = () => {
  return <FormSettingTable groupType={GROUP_TYPE_VERDICT} />;
};

FormSettingVerdict.propTypes = {};

FormSettingVerdict.defaultProps = {};

export default FormSettingVerdict;
