import { CloseCircleOutlined } from '@ant-design/icons';
import { Col, Form, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import AntButton from 'src/@crema/component/AntButton';
import FormContent from 'src/@crema/component/FormContent';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import style from './Normalization.module.scss';
import clsx from 'clsx';
import { isEmpty } from 'src/shared/utils/Typeof';
import { getDataContextAddJob } from '../..';
import AntModal from 'src/@crema/component/AntModal';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import InsertConditions from './InsertConditions';
import {
  evaluateCondition,
  handleRedundantData,
  variableListColumn,
} from 'src/shared/utils/Object';
import notification from 'src/shared/utils/notification';
import { TYPE_RULES_NORMALIZATION } from 'src/shared/constants/DataFixed';
import { renderRulesJob } from 'src/shared/utils/Array';
import isEqual from 'lodash/isEqual';

// import PropTypes from 'prop-types';

FormRules.propTypes = {};

function FormRules({ isDetail = false, isUpdate = false, dataDetailJob }) {
  const form = Form.useFormInstance();
  const rules = Form.useWatch('rules', form) || [];
  const [typeSetValue, setTypeSetValue] = useState('');
  const [isAddCondition, setIsAddCondition] = useState(false);
  const [nameFormClick, setNameFormClick] = useState();
  const [codeConditionSetValue, setConditionSetValue] = useState('');
  const codeBuildCondition = handleRedundantData(codeConditionSetValue);

  const listRulesDetail =
    renderRulesJob(dataDetailJob?.scheduler_response?.rules) || [];

  const optionTypeNormalization = !isUpdate
    ? [
        {
          label: 'Xóa cột',
          value: TYPE_RULES_NORMALIZATION.delete_column,
        },
        {
          label: 'Thêm cột',
          value: TYPE_RULES_NORMALIZATION.add_column,
        },
        {
          label: 'Set giá trị',
          value: TYPE_RULES_NORMALIZATION.set_value,
        },
        {
          label: 'Xóa bản ghi',
          value: TYPE_RULES_NORMALIZATION.delete_rows,
        },
      ]
    : [
        {
          label: 'Set giá trị',
          value: TYPE_RULES_NORMALIZATION.set_value,
        },
        {
          label: 'Xóa bản ghi',
          value: TYPE_RULES_NORMALIZATION.delete_rows,
        },
      ];

  const renderInitTypeNormal = (list1, list2) => {
    if (isDetail) {
      if (!isEmpty(listRulesDetail)) {
        return listRulesDetail[listRulesDetail?.length - 1]?.type;
      }
      return '';
    } else {
      for (const item1 of list1) {
        const foundItem = list2.find((item2) => item2?.type === item1?.value);
        if (!isEmpty(foundItem)) {
          return foundItem?.type;
        }
      }
      return optionTypeNormalization[optionTypeNormalization?.length - 1]
        ?.value;
    }
  };

  const formItemExpression =
    form.getFieldValue(
      ['rules', nameFormClick, 'set_value_expression'],
      form,
    ) || '';

  const formItemCondition =
    form.getFieldValue(['rules', nameFormClick, 'set_value_condition'], form) ||
    '';

  const formItemDeleteRecord =
    form.getFieldValue(
      ['rules', nameFormClick, TYPE_RULES_NORMALIZATION.delete_rows],
      form,
    ) || '';

  useEffect(() => {
    if (typeSetValue === TYPE_RULES_NORMALIZATION.expression) {
      setConditionSetValue(formItemExpression);
    }
    if (typeSetValue === TYPE_RULES_NORMALIZATION.condition) {
      setConditionSetValue(formItemCondition);
    }
    if (typeSetValue === TYPE_RULES_NORMALIZATION.delete_rows) {
      setConditionSetValue(formItemDeleteRecord);
    }
  }, [
    typeSetValue,
    formItemExpression,
    formItemCondition,
    formItemDeleteRecord,
    isAddCondition,
    nameFormClick,
    form,
  ]);

  const { dataCreateJob } = getDataContextAddJob();
  const { rulesOld, new_config_fields } = dataCreateJob || {};
  const refFormAddType = useRef();

  const listColumnSelectDetail =
    dataDetailJob?.scheduler_response?.config_fields?.map((item) => {
      return {
        label: item?.new_field_name,
        value: item?.new_field_name,
      };
    }) || [];
  const listColumnRulesDetail =
    dataDetailJob?.scheduler_response?.rules
      ?.filter((data) => data?.type === TYPE_RULES_NORMALIZATION.add_column)
      ?.map((item) => {
        return {
          label: item?.new_column,
          value: item?.new_column,
        };
      }) || [];

  const listNewColumnsRenderDetail = [
    ...listColumnSelectDetail,
    ...listColumnRulesDetail,
  ];

  const listColumnsSelect = isEmpty(new_config_fields)
    ? !isEmpty(dataDetailJob)
      ? listNewColumnsRenderDetail
      : []
    : new_config_fields?.map((item) => {
        return {
          label: item?.new_field_name,
          value: item?.new_field_name,
        };
      });

  const dataRenderColumn = !isEmpty(new_config_fields)
    ? new_config_fields?.map((item) => {
        return {
          nameColumn: item?.new_field_name,
          ...item,
        };
      })
    : !isEmpty(dataDetailJob)
    ? dataDetailJob?.scheduler_response?.config_fields?.map((item) => {
        return {
          nameColumn: item?.new_field_name,
          ...item,
        };
      })
    : [];
  const listColumnsOldDetail = listColumnRulesDetail?.map((item) => {
    return {
      ...item,
      nameColumn: item?.value,
    };
  });

  const newDataRenderColumn = [...dataRenderColumn, ...listColumnsOldDetail];

  return (
    <div className={clsx(style.wrapFormListRules)}>
      <Form.List name='rules'>
        {(fields, { add, remove }) => {
          return (
            <div>
              <FormContent
                ref={refFormAddType}
                onFinish={(data) => {
                  add({
                    type: data?.type_normalization,
                  });
                }}
                onSubmitCapture={(e) => {
                  e.preventDefault();
                  refFormAddType?.current.submit();
                }}
                initialValues={
                  isDetail || isUpdate
                    ? !isEmpty(dataDetailJob?.scheduler_response?.rules)
                      ? {
                          type_normalization:
                            renderInitTypeNormal(
                              optionTypeNormalization,
                              listRulesDetail,
                            ) || '',
                        }
                      : {}
                    : !isEmpty(rulesOld)
                    ? {
                        type_normalization:
                          rulesOld[rulesOld?.length - 1]?.type,
                      }
                    : {}
                }
                layout='vertical'>
                <Row gutter={[8, 8]} className={clsx(style.wrapFormType)}>
                  <Col span={12}>
                    <FormSelect
                      label='Chuẩn hóa'
                      allowClear={false}
                      // required
                      name='type_normalization'
                      options={optionTypeNormalization || []}
                      disabled={isDetail}
                    />
                  </Col>

                  <Col span={12} className={clsx(style.btnAdd)}>
                    <Col span={12}>
                      {!isDetail && (
                        <AntButton htmlType='submit' type='primary'>
                          Thêm
                        </AntButton>
                      )}
                    </Col>
                  </Col>
                  {isDetail &&
                    isEmpty(dataDetailJob?.scheduler_response?.rules) && (
                      <Col span={24}>
                        <label>Job này chưa có chuẩn hóa</label>
                      </Col>
                    )}
                </Row>
              </FormContent>

              {fields?.map(({ key, name, ...restField }, index) => {
                const rule = rules[index];
                const isDisableIsUpdate = Boolean(
                  listRulesDetail?.find((item) => isEqual(item, rule)),
                );
                const type = rule?.type;
                if (type === TYPE_RULES_NORMALIZATION.delete_column) {
                  return (
                    <div
                      key={`${key}-${index}`}
                      className={clsx(style.ruleItem)}>
                      <Row
                        gutter={[12, 12]}
                        className='d-flex items-center justify-between'>
                        <Col span={8}>
                          <Row gutter={[6, 6]}>
                            <Col span={24}>
                              <h5 className='mb-0'>Xóa cột</h5>
                            </Col>
                            <Col span={24}>
                              <FormSelect
                                options={listColumnsSelect}
                                name={[name, 'delete_column']}
                                required
                                labelHidden='Xóa cột'
                                placeholder='Chọn cột'
                                disabled={isDetail || isDisableIsUpdate}
                                {...restField}
                              />
                            </Col>
                          </Row>
                        </Col>
                        {!isDetail && !isDisableIsUpdate && (
                          <Col
                            span={16}
                            className='d-flex items-center justify-end'>
                            <CloseCircleOutlined
                              style={{
                                color: 'rgba(255, 77, 79, 1)',
                                fontSize: '18px',
                              }}
                              onClick={() => remove(name)}
                            />
                          </Col>
                        )}
                      </Row>
                    </div>
                  );
                }
                if (type === TYPE_RULES_NORMALIZATION.add_column) {
                  return (
                    <div key={index} className={clsx(style.ruleItem)}>
                      <Row gutter={[6, 6]}>
                        <Col span={24}>
                          <h5 className='mb-0'>Thêm cột</h5>
                        </Col>
                        <Col span={24}>
                          <Row
                            gutter={[8, 8]}
                            className='d-flex items-baseline justify-between'>
                            <Col span={8}>
                              <FormInput
                                required
                                placeholder='Nhập tên cột mới'
                                labelHidden='Tên cột mới'
                                name={[name, 'add_column_new_name']}
                                rules={{ maxLength: [{ value: 32 }] }}
                                disabled={isDetail || isDisableIsUpdate}
                              />
                            </Col>
                            <Col span={8}>
                              <FormSelect
                                options={[
                                  {
                                    label: 'INT',
                                    value: 'int',
                                  },
                                  {
                                    label: 'TEXT',
                                    value: 'text',
                                  },
                                  {
                                    label: 'CHAR',
                                    value: 'char',
                                  },
                                  {
                                    label: 'VARCHAR',
                                    value: 'varchar',
                                  },
                                  {
                                    label: 'DATE',
                                    value: 'date',
                                  },
                                  {
                                    label: 'BOOLEAN',
                                    value: 'boolean',
                                  },
                                ]}
                                required
                                placeholder='Kiểu dữ liệu'
                                labelHidden='Kiểu dữ liệu'
                                name={[name, 'add_column_data_type']}
                                disabled={isDetail || isDisableIsUpdate}
                              />
                            </Col>
                            {!isDetail && !isDisableIsUpdate ? (
                              <Col
                                span={8}
                                className='d-flex items-center justify-end'>
                                <CloseCircleOutlined
                                  style={{
                                    color: 'rgba(255, 77, 79, 1)',
                                    fontSize: '18px',
                                  }}
                                  onClick={() => remove(name)}
                                />
                              </Col>
                            ) : (
                              <Col span={8}></Col>
                            )}
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  );
                }
                if (type === TYPE_RULES_NORMALIZATION.set_value) {
                  return (
                    <div key={index} className={clsx(style.ruleItem)}>
                      <Row gutter={[6, 6]}>
                        <Col span={24}>
                          <h5 className='mb-0'>Set giá trị</h5>
                        </Col>
                        <Col span={24}>
                          <Row
                            gutter={[12, 12]}
                            className='d-flex items-baseline justify-between'>
                            <Col
                              span={!isDetail && !isDisableIsUpdate ? 23 : 24}>
                              <Row gutter={[12, 12]}>
                                <Col span={8}>
                                  <Row gutter={[8, 12]}>
                                    <Col span={20}>
                                      <FormSelect
                                        options={listColumnsSelect}
                                        required
                                        // mode='multiple'
                                        placeholder='Chọn cột'
                                        name={[name, 'set_value_add_column']}
                                        labelHidden='Chọn cột'
                                        disabled={isDetail || isDisableIsUpdate}
                                      />
                                    </Col>
                                    <Col span={4}>
                                      <AntButton
                                        disabled={
                                          isDetail || isDisableIsUpdate
                                        }>
                                        =
                                      </AntButton>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col span={8}>
                                  <FormInput
                                    required
                                    name={[name, 'set_value_expression']}
                                    placeholder=' Nhập biểu thức'
                                    labelHidden='Biểu thức'
                                    readOnly
                                    disabled={isDetail || isDisableIsUpdate}
                                    onClick={() => {
                                      setTypeSetValue(
                                        TYPE_RULES_NORMALIZATION.expression,
                                      );
                                      setNameFormClick(name);
                                      setIsAddCondition(true);
                                    }}
                                  />
                                </Col>
                                <Col span={8}>
                                  <FormInput
                                    // required
                                    readOnly
                                    placeholder='Nhập điều kiện'
                                    labelHidden='Điều kiện'
                                    name={[name, 'set_value_condition']}
                                    disabled={isDetail || isDisableIsUpdate}
                                    onClick={() => {
                                      setTypeSetValue(
                                        TYPE_RULES_NORMALIZATION.condition,
                                      );
                                      setNameFormClick(name);
                                      setIsAddCondition(true);
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Col>
                            {!isDetail && !isDisableIsUpdate && (
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
                            )}
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  );
                }
                if (type === TYPE_RULES_NORMALIZATION.delete_rows) {
                  return (
                    <div key={index} className={clsx(style.ruleItem)}>
                      <Row
                        gutter={[12, 12]}
                        className='d-flex items-center justify-between'>
                        <Col span={8}>
                          <Row gutter={[6, 6]}>
                            <Col span={24}>
                              <h5 className='mb-0'>Xóa bản ghi</h5>
                            </Col>
                            <Col span={24}>
                              <FormInput
                                required
                                name={[
                                  name,
                                  TYPE_RULES_NORMALIZATION.delete_rows,
                                ]}
                                labelHidden='Điều kiện'
                                placeholder='Điều kiện'
                                readOnly
                                disabled={isDetail || isDisableIsUpdate}
                                onClick={() => {
                                  setTypeSetValue(
                                    TYPE_RULES_NORMALIZATION.delete_rows,
                                  );
                                  setNameFormClick(name);
                                  setIsAddCondition(true);
                                }}
                              />
                            </Col>
                          </Row>
                        </Col>
                        {!isDetail && !isDisableIsUpdate && (
                          <Col
                            span={16}
                            className='d-flex items-center justify-end'>
                            <CloseCircleOutlined
                              style={{
                                color: 'rgba(255, 77, 79, 1)',
                                fontSize: '18px',
                              }}
                              onClick={() => remove(name)}
                            />
                          </Col>
                        )}
                      </Row>
                    </div>
                  );
                }
              })}
            </div>
          );
        }}
      </Form.List>
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
            // test check
            try {
              const variables = variableListColumn(newDataRenderColumn);
              const result = evaluateCondition(codeBuildCondition, variables);
              console.log('gia tri kiem tra:', result);

              if (typeSetValue === TYPE_RULES_NORMALIZATION.expression) {
                form.setFieldValue(
                  ['rules', nameFormClick, 'set_value_expression'],
                  codeBuildCondition,
                );
                form.validateFields([
                  ['rules', nameFormClick, 'set_value_expression'],
                ]);
              }
              if (typeSetValue === TYPE_RULES_NORMALIZATION.condition) {
                form.setFieldValue(
                  ['rules', nameFormClick, 'set_value_condition'],
                  codeBuildCondition,
                );
                form.validateFields([
                  ['rules', nameFormClick, 'set_value_condition'],
                ]);
              }
              if (typeSetValue === TYPE_RULES_NORMALIZATION.delete_rows) {
                form.setFieldValue(
                  [
                    'rules',
                    nameFormClick,
                    TYPE_RULES_NORMALIZATION.delete_rows,
                  ],
                  codeBuildCondition,
                );
                form.validateFields([
                  [
                    'rules',
                    nameFormClick,
                    TYPE_RULES_NORMALIZATION.delete_rows,
                  ],
                ]);
              }
              setIsAddCondition(false);
            } catch (error) {
              notification.warning('Biểu thức điều kiện không hợp lệ !');
            }
          } else {
            if (typeSetValue === TYPE_RULES_NORMALIZATION.condition) {
              form.setFieldValue(
                ['rules', nameFormClick, 'set_value_condition'],
                null,
              );
              setIsAddCondition(false);
            } else {
              notification.error('Vui lòng nhập biểu thức điều kiện !');
            }
          }
        }}
        onCancel={() => setIsAddCondition(false)}>
        <InsertConditions
          codeConditionSetValue={codeConditionSetValue}
          setConditionSetValue={setConditionSetValue}
          typeSetValue={typeSetValue}
          dataDetailJob={dataDetailJob}
        />
      </AntModal>
    </div>
  );
}

export default FormRules;
