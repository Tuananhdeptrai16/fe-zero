import React, { useMemo } from 'react';
import { Row, Col } from 'antd';
import AntCheckbox from 'src/@crema/component/AntCheckbox';
import AppScrollbar from 'src/@crema/core/AppScrollbar';

const AntCheckboxGroup = ({
  value: valueProps,
  onChange: onChangeProps,
  returnObject,
  ...props
}) => {
  const {
    customStyle = {
      padding: '0.5rem 0',
    },
    options,
    span = 6,
  } = props;

  // const onChange = (ids) => {
  //   if (!returnObject) {
  //     onChangeProps(ids);
  //   } else {
  //     const listCheck = options?.filter((option) =>
  //       ids.includes(option?.value || option?.id),
  //     );
  //     onChangeProps(listCheck);
  //   }
  // };

  const value =
    useMemo(() => {
      if (returnObject) {
        return valueProps?.map((item) => item?.value || item?.id);
      } else return valueProps;
    }, [valueProps]) || [];

  const onChangeSelectItem = (item, status) => {
    const valueItem = item?.value || item?.id;
    let newValue;
    if (returnObject) {
      if (status) {
        newValue = valueProps || [];
        newValue.push(item);
      } else {
        newValue = (valueProps || []).filter((item) => {
          const valueOption = item?.value || item?.id;

          return valueOption !== valueItem;
        });
      }
    } else {
      if (status) {
        newValue = valueProps || [];
        newValue.push(valueItem);
      } else {
        newValue = (valueProps || []).filter((valueOption) => {
          return valueOption !== valueItem;
        });
      }
    }
    onChangeProps([...newValue]);
  };

  return (
    <AppScrollbar style={{ height: 350 }}>
      <Row>
        {options?.map((option) => {
          const valueOption = option?.value || option?.id;
          return (
            <Col style={customStyle} key={valueOption} span={span}>
              <AntCheckbox
                checked={value.includes(valueOption)}
                onChange={(e) => onChangeSelectItem(option, e.target.checked)}
                value={valueOption}>
                {option?.label || option?.name}
              </AntCheckbox>
            </Col>
          );
        })}
      </Row>
    </AppScrollbar>
  );
};

export default AntCheckboxGroup;
