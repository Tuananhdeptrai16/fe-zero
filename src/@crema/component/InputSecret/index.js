import React, { useMemo, useState } from 'react';
import { AcEditIcon } from 'src/assets/icon/action';
import Icon, { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { isEmpty } from 'src/shared/utils/Typeof';

// eslint-disable-next-line no-unused-vars
const InputSecret = ({ value: valueProp, onChange, disabled, ...props }) => {
  const [eventChange, setEventChange] = useState(null);
  const [valuePrev, setValuePrev] = useState('');
  const [value, setValue] = useState('');
  const [enableChange, setEnableChange] = useState(false);

  const isFormNew = useMemo(() => isEmpty(valueProp), []);
  if (isFormNew) {
    return (
      <Input.Password
        autoComplete='new-password'
        value={valueProp}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
    );
  }
  return (
    <Input.Password
      autoComplete='new-password'
      value={disabled || !enableChange ? '******' : value}
      disabled={disabled || !enableChange}
      onChange={(e) => {
        if (!disabled && enableChange) {
          setValue(e?.target?.value);
          setEventChange(e);
        }
      }}
      addonAfter={
        !disabled &&
        (!enableChange ? (
          <Icon
            onClick={() => {
              setValuePrev(value);
              setEnableChange(true);
            }}
            component={AcEditIcon}
          />
        ) : (
          <Space>
            <Icon
              onClick={() => {
                onChange(eventChange);
                setEnableChange(false);
              }}
              component={CheckOutlined}
            />
            <Icon
              onClick={() => {
                setEnableChange(false);
                setValue(valuePrev);
                setEventChange(null);
              }}
              component={CloseOutlined}
            />
          </Space>
        ))
      }
      {...props}
    />
  );
};

InputSecret.propTypes = {};

InputSecret.defaultProps = {};

export default InputSecret;
