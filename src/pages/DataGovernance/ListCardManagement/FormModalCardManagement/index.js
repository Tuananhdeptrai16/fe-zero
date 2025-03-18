import { Col, Row } from 'antd';
import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';

// import PropTypes from 'prop-types';

FormModalCardManagement.propTypes = {};

function FormModalCardManagement() {
  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <FormSelectAsync
          label='Loại thẻ'
          name='tag_category_id'
          fieldNames={{ label: 'name', value: 'id' }}
          configFetch={{
            url: API.GET_LIST_CARD_CLASSIFY,
            method: METHOD_FETCH.POST,
            body: {
              filters: [],
              pageable: {
                page: 1,
                page_size: 10000,
              },
            },
          }}
          // returnObject
          required
        />
        <FormInput name='name' label='Tên thẻ' required />
        <FormTextArea name='description' label='Mô tả thẻ' />
      </Col>
    </Row>
  );
}

export default FormModalCardManagement;
