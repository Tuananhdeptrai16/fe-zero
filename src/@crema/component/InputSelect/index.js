import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AntInputNumber from 'src/@crema/component/AntInputNumber';
import { UNIT_HTML_REGEX } from 'src/shared/constants/Regex';
import AntSelect from '../AntSelect';
import './input-select.styles.less';
const InputSelect = (props) => {
  const {
    value: valueProps,
    onChange: onChangeProps,
    options: selectOptions,
  } = props;
  const [input, setInput] = useState();
  const [unit, setUnit] = useState();
  const preUnitRef = useRef();
  useEffect(() => {
    if (valueProps) {
      const [, newInput, newUnit] = UNIT_HTML_REGEX.exec(valueProps) || [];
      const newInputInt = +newInput;
      if ((newInputInt !== input || unit !== newUnit) && newInputInt && unit) {
        setInput(newInputInt);
        setUnit(newUnit);
        preUnitRef.current = newUnit;
      }
    } else {
      setInput(null);
      setUnit(preUnitRef.current);
    }
  }, [valueProps]);
  return (
    <div className='input-select'>
      <AntInputNumber
        value={input}
        onChange={(e) => {
          if (e && unit) {
            onChangeProps(`${e}${unit}`);
          } else {
            onChangeProps('');
          }
          setInput(e);
        }}
      />
      <AntSelect
        value={unit}
        options={selectOptions}
        onChange={(e) => {
          if (e && input) {
            onChangeProps(`${input}${e}`);
          } else {
            onChangeProps('');
          }
          setUnit(e);
          preUnitRef.current = e;
        }}
      />
    </div>
  );
};

export default InputSelect;
InputSelect.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  options: PropTypes.array,
};

InputSelect.defaultProps = {
  value: {},
};
