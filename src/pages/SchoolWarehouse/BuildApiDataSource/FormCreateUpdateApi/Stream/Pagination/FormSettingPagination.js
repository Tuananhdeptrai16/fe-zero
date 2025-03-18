import { Col, Form, Row } from 'antd';
import React, { useState } from 'react';
import FormInputNumber from 'src/@crema/core/Form/FormInputNumber';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormPageToken from './FormPageToken';
import FormPageSize from './FormPageSize';
import AntCheckbox from 'src/@crema/component/AntCheckbox';
import FormHidden from 'src/@crema/core/Form/FormHidden';
import { isEmpty } from 'src/shared/utils/Typeof';

FormSettingPagination.propTypes = {};

const PAGINATOR_PAGINATION_STRATEGY_TYPE = [
  'retriever',
  'paginator',
  'pagination_strategy',
  'type',
];

const PAGINATION_PAGE_SIZE = [
  'retriever',
  'paginator',
  'pagination_strategy',
  'page_size',
];

function FormSettingPagination() {
  const form = Form.useFormInstance();
  const pageTokenFieldName = form.getFieldValue([
    'retriever',
    'paginator',
    'page_token_option',
    'field_name',
  ]);
  const pageSizeFieldName = form.getFieldValue([
    'retriever',
    'paginator',
    'page_size_option',
    'field_name',
  ]);
  const [injectOffset, setInjectOffset] = useState(
    !isEmpty(pageTokenFieldName) && pageTokenFieldName !== 'offset',
  );
  const [injectPageNumber, setInjectPageNumber] = useState(
    pageTokenFieldName !== 'page',
  );
  const [injectPageSize, setInjectPageSize] = useState(
    !isEmpty(pageSizeFieldName) && pageSizeFieldName !== 'limit',
  );
  const typePaginationStrategy = Form.useWatch(
    PAGINATOR_PAGINATION_STRATEGY_TYPE,
  );
  const pageSize = Form.useWatch(PAGINATION_PAGE_SIZE);

  return (
    <div>
      <Row>
        <Col span={24}>
          <FormHidden
            name={['retriever', 'paginator', 'type']}
            defaultValue={'DefaultPaginator'}
          />
          <FormSelect
            getPopupContainer={(trigger) => trigger.parentNode}
            label='Loại phân trang'
            required
            name={PAGINATOR_PAGINATION_STRATEGY_TYPE}
            options={[
              {
                label: 'Tăng dần độ dịch',
                value: 'OffsetIncrement',
              },
              {
                label: 'Tăng dần trang',
                value: 'PageIncrement',
              },
            ]}
          />
        </Col>
        {typePaginationStrategy === 'OffsetIncrement' && (
          <>
            <Col span={24}>
              <FormInputNumber name={PAGINATION_PAGE_SIZE} label='Giới hạn' />
            </Col>
            <Col span={24} className={'mb-2'}>
              <AntCheckbox
                checked={injectOffset}
                onChange={(e) => setInjectOffset(e.target.checked)}>
                Chèn Offset vào yêu cầu HTTP gửi đi
              </AntCheckbox>
            </Col>
            {injectOffset && <FormPageToken />}
            {!isEmpty(pageSize) && (
              <Col span={24}>
                <AntCheckbox
                  checked={injectPageSize}
                  onChange={(e) => setInjectPageSize(e.target.checked)}>
                  Chèn kích thước trang vào yêu cầu HTTP gửi đi
                </AntCheckbox>
              </Col>
            )}
            {!isEmpty(pageSize) && injectPageSize && (
              <Col span={24} className={'mt-4'}>
                <FormPageSize />
              </Col>
            )}
            {!injectOffset && (
              <FormHidden
                name={['retriever', 'paginator', 'page_token_option']}
                defaultValue={{
                  type: 'RequestOption',
                  inject_into: 'request_parameter',
                  field_name: 'offset',
                }}
              />
            )}
            <FormHidden
              name={['retriever', 'paginator', 'page_size_option']}
              defaultValue={{
                inject_into: 'request_parameter',
                field_name: 'limit',
                type: 'RequestOption',
              }}
            />
          </>
        )}
        {typePaginationStrategy === 'PageIncrement' && (
          <>
            <Col span={24}>
              <FormInputNumber
                name={[
                  'retriever',
                  'paginator',
                  'pagination_strategy',
                  'page_size',
                ]}
                label='Giới hạn'
              />
            </Col>
            <Col span={24}>
              <FormInputNumber
                name={[
                  'retriever',
                  'paginator',
                  'pagination_strategy',
                  'start_from_page',
                ]}
                label='Bắt đầu từ trang'
              />
            </Col>
            <Col span={24}>
              <AntCheckbox
                checked={injectPageSize}
                onChange={(e) => setInjectPageSize(e.target.checked)}>
                Chèn kích thước trang vào yêu cầu HTTP gửi đi
              </AntCheckbox>
            </Col>
            {injectPageSize && (
              <Col span={24} className={'mt-4'}>
                <FormPageSize />
              </Col>
            )}
            {!injectPageSize && (
              <FormHidden
                name={['retriever', 'paginator', 'page_size_option']}
                defaultValue={{
                  inject_into: 'request_parameter',
                  field_name: 'limit',
                  type: 'RequestOption',
                }}
              />
            )}
            <Col span={24}>
              <AntCheckbox
                checked={injectPageNumber}
                onChange={(e) => setInjectPageNumber(e.target.checked)}>
                Chèn số trang vào yêu cầu HTTP gửi đi
              </AntCheckbox>
            </Col>
            {injectPageNumber && (
              <Col span={24} className={'mt-4'}>
                <FormPageToken />
              </Col>
            )}
            {!injectPageNumber && (
              <FormHidden
                name={['retriever', 'paginator', 'page_token_option']}
                defaultValue={{
                  type: 'RequestOption',
                  inject_into: 'request_parameter',
                  field_name: 'page',
                }}
              />
            )}
          </>
        )}
      </Row>
    </div>
  );
}

export default FormSettingPagination;
