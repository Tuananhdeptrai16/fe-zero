import { Col, Row } from 'antd';
import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormHidden from 'src/@crema/core/Form/FormHidden';
import QueryParameters from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormCreateUpdateApi/Stream/QueryParameters';
import RequestHeaders from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormCreateUpdateApi/Stream/RequestHeaders';
import RequestBody from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormCreateUpdateApi/Stream/RequestBody';
import ParameterizedRequests from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormCreateUpdateApi/Stream/ParameterizedRequests/ParameterizedRequests';
import Pagination from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormCreateUpdateApi/Stream/Pagination/Pagination';
import RecordSelector from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormCreateUpdateApi/Stream/RecordSelector/RecordSelector';
import ParentStream from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormCreateUpdateApi/Stream/ParentStream/ParentStream';

FormStream.propTypes = {};

export const RETRIEVER_REQUESTER_REF = ['retriever', 'requester', '$ref'];

function FormStream({ listStream }) {
  return (
    <div>
      <FormHidden
        name={RETRIEVER_REQUESTER_REF}
        defaultValue={'#/definitions/base_requester'}
      />
      <FormHidden
        name={['retriever', 'type']}
        defaultValue={'SimpleRetriever'}
      />
      <FormHidden name={'type'} defaultValue={'DeclarativeStream'} />
      <Row gutter={[8, 0]}>
        <Col span={24}>
          <FormInput label='Tên luồng' required name='name' />
        </Col>
        <Col span={12}>
          <FormInput
            label='Đường dẫn URL'
            name={['retriever', 'requester', 'path']}
            required
          />
        </Col>
        <Col span={12}>
          <FormSelect
            getPopupContainer={(trigger) => trigger.parentNode}
            label='Phương thức HTTP'
            name={['retriever', 'requester', 'http_method']}
            required
            options={[
              {
                label: 'GET',
                value: 'GET',
              },
              {
                label: 'POST',
                value: 'POST',
              },
            ]}
          />
        </Col>
        <Col span={24}>
          <FormSelect
            getPopupContainer={(trigger) => trigger.parentNode}
            mode='tags'
            label='Khóa chính'
            name='primary_key'
          />
        </Col>
        <Col span={24}>
          <RecordSelector />
        </Col>
        <Col span={24} className={'mt-4'}>
          <QueryParameters />
        </Col>
        <Col span={24} className={'mt-4'}>
          <RequestHeaders />
        </Col>
        <Col span={24} className={'mt-4'}>
          <RequestBody />
        </Col>
        <Col span={24}>
          <Pagination />
        </Col>
        <Col span={24}>
          <ParameterizedRequests />
        </Col>
        <Col span={24}>
          <ParentStream listStream={listStream} />
        </Col>
      </Row>
    </div>
  );
}

export default FormStream;
