import { Col, Row } from 'antd';
import React from 'react';
// import useIntl from 'react-intl/lib/src/components/useIntl';
// import { Form } from 'react-router-dom';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';

const FormAddOrEdit = ({ id }) => {
  //   const { messages } = useIntl();
  //   const form = Form.useFormInstance();
  //   const objectTypeWatch = Form.useWatch('type', form) || '';
  return (
    <div>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <FormInput
            label='Tên bộ chỉ tiêu'
            name='criterion_group_name'
            required
            rules={{ maxLength: [{ value: 128 }] }}
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <FormSelectAsync
            fieldNames={{ label: 'criterion_name', value: 'id' }}
            name={'criterion_ids'}
            label='Lựa chọn chỉ tiêu'
            placeholder='Lựa chọn chỉ tiêu'
            showArrow
            // options={roles}
            configFetch={{
              url: API.GET_LIST_CRITERION,
              method: METHOD_FETCH.POST,
              body: {
                filters: [
                  {
                    name: 'criterion_types_id',
                    value: id,
                    operation: 'eq',
                  },
                ],
                pageable: {
                  page: 1,
                  page_size: 10,
                  //   sort: [{ property: 'id', direction: 'desc' }],
                },
              },
            }}
            mode={'multiple'}
            // maxTagCount={'responsive'}
            required
          />
        </Col>
      </Row>
    </div>
  );
};

export default FormAddOrEdit;
