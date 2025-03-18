import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { isEmpty, isNumber, isObject, isString } from 'src/shared/utils/Typeof';
import { find, filter, get, isArray, uniqBy } from 'lodash';
import { KEY_EMPTY_SELECT } from 'src/shared/constants/Default';

const { Option, OptGroup } = Select;

const useSelectWrapperValue = (props) => {
  const {
    value: valueProp,
    onChange: onChangeProp,
    returnObject,
    fieldNames,
    renderItem,
    options = [],
  } = props || {};
  const { messages } = useIntl();
  const [value, setValue] = useState();

  const getKeyItem = (item) => {
    if (isArray(item.options)) {
      return item.label;
    }
    let key = item?.value || item?.id;
    if (!isEmpty(fieldNames)) {
      key =
        get(item, fieldNames?.value || 'value' || 'id') ||
        item?.value ||
        item?.id;
    }

    if (isString(item) || isNumber(item)) {
      key = item;
    }
    return key;
  };

  const getOptions = () => {
    let optionsAppend = [];
    const isOptionGroup = find(options, (option) => isArray(option.options));
    if (returnObject && !isOptionGroup) {
      if (isArray(valueProp)) {
        if (isObject(valueProp?.[0])) {
          optionsAppend = valueProp;
        }
      } else if (isObject(valueProp)) {
        optionsAppend = [valueProp];
      }
    }

    return uniqBy([...optionsAppend, ...options], (item) => {
      return getKeyItem(item);
    }).filter((item) => {
      return !isEmpty(getKeyItem(item));
    });
  };

  const optionsAll = getOptions();

  useEffect(() => {
    if (returnObject) {
      const value = isEmpty(fieldNames)
        ? valueProp?.value
        : isArray(valueProp)
        ? valueProp?.every((data) => isObject(data))
          ? valueProp?.map((data) => get(data, fieldNames?.value))
          : valueProp
        : valueProp?.[fieldNames?.value];
      setValue(value);
    } else if (
      isArray(valueProp) &&
      valueProp.every((value) => isObject(value))
    ) {
      const value = valueProp?.map((data) => get(data, fieldNames?.value));
      setValue(value);
    } else {
      setValue(valueProp);
    }
    // eslint-disable-next-line
  }, [valueProp]);

  const onChange = (newValue, options) => {
    setValue(newValue);

    if (returnObject) {
      let objectSelect;

      if (isArray(newValue)) {
        objectSelect = [];
        optionsAll.forEach((option) => {
          if (isArray(option.options)) {
            const optionsCheck = filter(option.options, (optionChild) => {
              const value = isEmpty(fieldNames)
                ? optionChild?.value
                : get(optionChild, fieldNames?.value);
              return newValue.includes(value);
            });
            objectSelect.push(...optionsCheck);
          } else {
            const value = isEmpty(fieldNames)
              ? option?.value
              : get(option, fieldNames?.value);
            if (newValue.includes(value)) {
              objectSelect.push(option);
            }
          }
        });
      } else {
        optionsAll.forEach((option) => {
          if (isArray(option.options)) {
            const optionCheck = find(option.options, (optionChild) => {
              const value = isEmpty(fieldNames)
                ? optionChild?.value
                : get(optionChild, fieldNames?.value);
              return newValue === value;
            });
            if (optionCheck) {
              objectSelect = optionCheck;
            }
          } else {
            const value = isEmpty(fieldNames)
              ? option?.value
              : option?.[fieldNames?.value];

            if (value === newValue) {
              objectSelect = option;
            }
          }
        });
      }
      onChangeProp(objectSelect, options);
    } else {
      onChangeProp(newValue, options);
    }
  };

  const renderOptions = ({ isLoading } = {}) => {
    const options = getOptions() || [];

    return (
      <>
        {options?.length > 7 && isLoading && (
          <Option disabled value='loading-1'>
            <div className='ant-d-flex ant-align-center ant-justify-center'>
              <Spin tip={messages['select.loading']} size='small' />
            </div>
          </Option>
        )}
        {options.map((option, index) => {
          if (option.options) {
            return (
              <OptGroup key={`otp-group-${index}`} label={option.label}>
                {option.options.map((optionChild, indexChild) => {
                  const value = isEmpty(fieldNames?.value)
                    ? optionChild?.value
                    : get(optionChild, fieldNames?.value);
                  const label = isEmpty(fieldNames?.label)
                    ? optionChild?.label
                    : get(optionChild, fieldNames?.label);

                  return (
                    <Option
                      key={`option-index-${index}-${indexChild}`}
                      value={
                        value ?? `${KEY_EMPTY_SELECT}${index}-${indexChild}`
                      }
                      label={label}>
                      {renderItem ? renderItem(optionChild, index) : label}
                    </Option>
                  );
                })}
              </OptGroup>
            );
          }
          const value = isEmpty(fieldNames?.value)
            ? option?.value
            : get(option, fieldNames?.value);
          const label = isEmpty(fieldNames?.label)
            ? option?.label
            : get(option, fieldNames?.label);
          return (
            <Option
              key={`option-index-${index}-${value}`}
              value={value ?? `${KEY_EMPTY_SELECT}${index}`}
              label={label}>
              {renderItem ? renderItem(option, index) : label}
            </Option>
          );
        })}
        {isLoading && (
          <Option disabled value='loading'>
            <div className='ant-d-flex ant-align-center ant-justify-center'>
              <Spin tip={messages['select.loading']} size='small' />
            </div>
          </Option>
        )}
      </>
    );
  };

  return {
    value,
    options: getOptions(),

    renderOptions,
    onChange,
  };
};

useSelectWrapperValue.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  returnObject: PropTypes.bool,
  fieldNames: PropTypes.object,
  renderItem: PropTypes.func,
  options: PropTypes.array,
};

useSelectWrapperValue.defaultProps = {};

export default useSelectWrapperValue;
