import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Form, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import AntButton from 'src/@crema/component/AntButton';
import FormHidden from 'src/@crema/core/Form/FormHidden';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { IconGte, IconLte, IconPercent } from 'src/assets/icon';
import { isEmpty } from 'src/shared/utils/Typeof';
import clsx from 'clsx';
import style from './Normalization.module.scss';
import AntModal from 'src/@crema/component/AntModal';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import InsertConditions from './InsertConditions';
import notification from 'src/shared/utils/notification';
import { handleRedundantData } from 'src/shared/utils/Object';
// import PropTypes from 'prop-types';

FormFormula.propTypes = {};

function FormFormula({ isDetail = false, isUpdate = false, dataDetailJob }) {
  const form = Form.useFormInstance();
  const [isAddCondition, setIsAddCondition] = useState(false);
  const [codeConditionSetValue, setConditionSetValue] = useState('');
  const codeBuildCondition = handleRedundantData(codeConditionSetValue);
  const [nameFormClick, setNameFormClick] = useState();
  const refAddType = useRef();

  const formItemCondition =
    form.getFieldValue(
      ['condition_formulas', nameFormClick, 'condition_sql'],
      form,
    ) || '';

  useEffect(() => {
    setConditionSetValue(formItemCondition);
  }, [formItemCondition, isAddCondition, nameFormClick, form]);

  useEffect(() => {
    if (!isDetail && !isUpdate) {
      refAddType.current();
    }
  }, []);

  return (
    <Row className={clsx(style.wrapFromFormula)}>
      <Col span={24}>
        <FormHidden name='rules' />
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <div className='d-flex items-center justify-between'>
              <h4 className='mb-0'>Thêm điều kiện</h4>
              {isDetail || isUpdate ? (
                <></>
              ) : (
                <AntButton
                  type='primary'
                  onClick={() => {
                    if (!isEmpty(refAddType.current)) {
                      refAddType.current();
                    }
                  }}
                  icon={<PlusOutlined />}>
                  Thêm
                </AntButton>
              )}
            </div>
            {isDetail || isUpdate ? (
              isEmpty(
                dataDetailJob?.scheduler_response?.condition_formulas,
              ) && (
                <span className='mt-1 d-block'>
                  Công thức này chưa điều kiện thêm loại
                </span>
              )
            ) : (
              <></>
            )}
          </Col>
          <Col span={24}>
            <Form.List name={'condition_formulas'}>
              {(fields, { add, remove }) => {
                refAddType.current = add;
                return (
                  <>
                    {fields?.map(({ key, name, ...restField }) => {
                      return (
                        <div
                          key={key}
                          className={clsx(style.condition_formula)}>
                          <Row gutter={[6, 6]}>
                            <Col span={isDetail || isUpdate ? 24 : 23}>
                              <Row>
                                <Col span={24}>
                                  <Row gutter={[8, 0]}>
                                    <Col span={12}>
                                      <FormInput
                                        required
                                        label='Tên điều kiện'
                                        name={[name, 'condition_name']}
                                        rules={{ maxLength: [{ value: 128 }] }}
                                        disabled={isDetail}
                                        {...restField}
                                      />
                                    </Col>
                                    <Col span={12}>
                                      <FormInput
                                        required
                                        label='Điều kiện'
                                        name={[name, 'condition_sql']}
                                        readOnly
                                        disabled={isDetail || isUpdate}
                                        onClick={() => {
                                          setNameFormClick(name);
                                          setIsAddCondition(true);
                                        }}
                                        {...restField}
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                                <Col span={24}>
                                  <label
                                    className={clsx(
                                      style.label_select_table_formula,
                                    )}>
                                    Nhập giá trị chỉ tiêu
                                  </label>
                                  <Row gutter={[8, 8]}>
                                    <Col span={3}>
                                      <FormSelect
                                        required
                                        name={[name, 'operation']}
                                        placeholder='Chọn điều kiện'
                                        labelHidden='Điều kiện'
                                        {...restField}
                                        disabled={isDetail}
                                        options={[
                                          {
                                            label: <IconGte />,
                                            value: 'gte',
                                          },
                                          {
                                            label: <IconLte />,
                                            value: 'lte',
                                          },
                                        ]}
                                      />
                                    </Col>
                                    <Col span={18}>
                                      <FormInput
                                        required
                                        rules={{
                                          digit: [],
                                          maxLength: [{ value: 10 }],
                                        }}
                                        name={[name, 'value']}
                                        labelHidden='Giá trị chỉ tiêu'
                                        placeholder='Vui lòng nhập giá trị chỉ tiêu'
                                        disabled={isDetail}
                                        {...restField}
                                      />
                                    </Col>
                                    <Col span={3}>
                                      <FormSelect
                                        name={[name, 'unit']}
                                        required
                                        placeholder='Chọn điều kiện'
                                        labelHidden='Điều kiện'
                                        disabled={isDetail}
                                        {...restField}
                                        options={[
                                          {
                                            label: <IconPercent />,
                                            value: 'percent',
                                          },
                                          {
                                            label: 'Số lượng',
                                            value: 'quantity',
                                          },
                                        ]}
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                            {isDetail ||
                              (isUpdate ? (
                                <></>
                              ) : (
                                <Col
                                  span={1}
                                  className='d-flex items-center justify-end'>
                                  <CloseCircleOutlined
                                    style={{
                                      color: 'rgba(255, 77, 79, 1)',
                                      fontSize: '18px',
                                    }}
                                    onClick={() => remove(name)}
                                  />
                                </Col>
                              ))}
                          </Row>
                        </div>
                      );
                    })}
                  </>
                );
              }}
            </Form.List>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        {/* insert condition set or delete record */}
        <AntModal
          size={MODAL_SIZE.LARGE}
          bodyStyle={{ maxHeight: '75vh', overflow: 'auto' }}
          centered
          cancelText='Hủy'
          okText='Xong'
          title='Chèn điều kiện'
          open={isAddCondition}
          onOk={() => {
            if (!isEmpty(codeBuildCondition)) {
              form.setFieldValue(
                ['condition_formulas', nameFormClick, 'condition_sql'],
                codeBuildCondition,
              );
              form.validateFields([
                ['condition_formulas', nameFormClick, 'condition_sql'],
              ]);
              setIsAddCondition(false);
            } else {
              notification.error('Vui lòng nhập biểu thức điều kiện !');
            }
          }}
          onCancel={() => setIsAddCondition(false)}>
          <InsertConditions
            codeConditionSetValue={codeConditionSetValue}
            setConditionSetValue={setConditionSetValue}
            dataDetailJob={dataDetailJob}
            isFormula
          />
        </AntModal>
      </Col>
    </Row>
  );
}

export default FormFormula;
