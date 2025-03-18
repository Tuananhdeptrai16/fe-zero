import { Col } from 'antd';
import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { getDataContextAddJob } from '../../..';
import {
  MODE_OPTION_TABLE_CREATE_JOB,
  TYPE_DATA_MARK_SCHOOL_WAREHOUSE,
} from 'src/shared/constants/DataFixed';
// import PropTypes from 'prop-types';

FormDestinationTableName.propTypes = {};

function FormDestinationTableName({
  dataDetailJob,
  modeOptionTable,
  isDetail,
  optionSelectTableRenders = [],
}) {
  const { dataCreateJob } = getDataContextAddJob();
  const { typeDataMark } =
    dataCreateJob || dataDetailJob?.scheduler_response || {};

  return (
    <>
      <Col span={24}>
        {modeOptionTable === MODE_OPTION_TABLE_CREATE_JOB?.create_table ? (
          typeDataMark !== TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML && (
            <FormInput
              required
              name='nuclear_table_name_create_table'
              label={
                typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML
                  ? 'Tên tập dữ liệu'
                  : 'Tên bảng đích'
              }
              disabled={isDetail}
              rules={{
                check_accented_characters: [],
                uppercase_character: [],
                trim_space: [],
                special_characters: [],
                maxLength: [{ value: 128 }],
                non_full_digit: [],
                non_slash: [],
              }}
            />
          )
        ) : (
          <FormSelect
            label='Tên bảng đích'
            name='nuclear_table_name_use_table'
            options={optionSelectTableRenders}
            required
            allowClear
            disabled={isDetail}
          />
        )}
      </Col>
    </>
  );
}

export default FormDestinationTableName;
