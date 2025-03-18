import { Button, Steps, Form, Space, Spin } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { generateUniqueID } from 'src/@crema/utility/Utils';

import styles from './style.module.scss';
import { useIntl } from 'react-intl';
import FormContent from 'src/@crema/component/FormContent';

const StepsForm = (props) => {
  const {
    initStep,
    items,
    initialValues,
    classNameStep,
    classNameContent,
    onSave,
    onCancel,
    isLoading,
    isEditable,
    ...attrs
  } = props;
  const refFormId = useRef(`form-step-${generateUniqueID()}`);
  const [form] = Form.useForm();
  const [status, setStatus] = useState({});
  const [stepCurrent, setStep] = useState(initStep || 0);
  const [data, setData] = useState(initialValues);
  const ComponentContent = items[stepCurrent].content;

  const { messages } = useIntl();

  const changeStep = (nextStep) => {
    const stepOld = stepCurrent;
    form
      .validateFields()
      .then(() => {
        setStatus({ ...status, [stepOld]: 'finish' });
      })
      .catch(() => {
        setStatus({ ...status, [stepOld]: 'error' });
      })
      .then(() => {
        if (nextStep >= 0 && nextStep < items?.length) {
          setStep(nextStep);
        }
      });
  };

  useEffect(() => {
    setStatus({});
  }, [items]);

  const onChangeData = (_, allValues) => {
    setData((prevState) => {
      return Object.assign({}, prevState || {}, allValues);
    });
  };

  const listItems = items?.map((item, index) => ({
    ...item,
    status: stepCurrent === index ? undefined : status[index],
    title: messages[item.title] || item.title,
  }));

  const onFinish = () => {
    onSave(data);
  };

  return (
    <div className={styles.stepsForm}>
      <Steps
        {...attrs}
        className={classNameStep}
        onChange={changeStep}
        current={stepCurrent}
        items={listItems}
      />
      <div className={`${styles.stepContent} ${classNameContent}`}>
        <Spin spinning={isLoading} delay={500}>
          <FormContent
            className={styles.stepContentWrapper}
            id={refFormId.current}
            initialValues={initialValues}
            onValuesChange={onChangeData}
            form={form}
            layout='vertical'
            onFinish={onFinish}>
            <ComponentContent
              allFormData={data}
              formInstance={form}
              isEditable={isEditable}
            />
          </FormContent>
        </Spin>
        <Space size={[8, 0]} className={styles.stepAction}>
          {onCancel && stepCurrent === 0 && (
            <Button onClick={onCancel}>Hủy</Button>
          )}
          {stepCurrent > 0 && (
            <Button onClick={() => changeStep(stepCurrent - 1)}>
              Quay lại
            </Button>
          )}
          {stepCurrent < items.length - 1 && (
            <Button
              type='primary'
              onClick={() => {
                changeStep(stepCurrent + 1);
              }}>
              Tiếp tục
            </Button>
          )}
          {stepCurrent === items.length - 1 && (
            <Button
              loading={isLoading}
              form={refFormId.current}
              htmlType='submit'
              type='primary'>
              Lưu
            </Button>
          )}
        </Space>
      </div>
    </div>
  );
};

StepsForm.propTypes = {
  initialValues: PropTypes.object,
  initStep: PropTypes.number,
  items: PropTypes.array,
  onSave: PropTypes.func,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
  isLoading: PropTypes.bool,
  classNameStep: PropTypes.string,
  classNameContent: PropTypes.string,
  isEditable: PropTypes.bool,
};

StepsForm.defaultProps = {};

export default StepsForm;
