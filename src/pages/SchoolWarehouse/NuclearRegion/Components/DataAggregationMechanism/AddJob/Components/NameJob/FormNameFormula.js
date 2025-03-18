import { Col, Row } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
// import PropTypes from 'prop-types';

FormNameFormula.propTypes = {};

function FormNameFormula({ isUpdate = false, isDetail = false }) {
  const { id: idFormula } = useParams();
  return (
    <Row>
      <Col span={24}>
        <FormSelectAsync
          label='Chọn chỉ tiêu'
          name={'criterion_id'}
          fieldNames={{ label: 'criterion_name', value: 'id' }}
          configFetch={{
            url: API.GET_LIST_CRITERION_UNUSED,
            method: METHOD_FETCH.GET,
            params:
              isUpdate || isDetail
                ? {
                    formulaId: idFormula,
                  }
                : {},
          }}
          deps={[idFormula, isUpdate, isDetail]}
          disabled={isDetail}
          required
        />
      </Col>
      <Col span={24}>
        <FormInput
          name={'formula_name'}
          label={'Tên công thức'}
          disabled={isDetail}
          required
          rules={{ maxLength: [{ value: 128 }] }}
        />
      </Col>
    </Row>
  );
}

export default FormNameFormula;
