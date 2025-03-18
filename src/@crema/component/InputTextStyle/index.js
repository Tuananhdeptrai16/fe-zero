import React, { useState, useEffect } from 'react';
import {
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
  BiBold,
  BiItalic,
} from 'react-icons/bi';
import PropTypes from 'prop-types';
import './input-text-style.styles.less';
import AntInputNumber from 'src/@crema/component/AntInputNumber';
import BasicPickColor from '../BasicPickColor';
const textAligns = [
  {
    value: 'left',
    icon: <BiAlignLeft />,
    id: 1,
  },
  {
    value: 'center',
    icon: <BiAlignMiddle />,
    id: 2,
  },
  {
    value: 'right',
    icon: <BiAlignRight />,
    id: 3,
  },
];

const defaultTextStyle = {
  align: 'left',
  weight: 'normal',
  style: 'normal',
  size: '14',
  color: '#000000',
};

const InputTextStyle = (props) => {
  const {
    value: valueProps,
    onChange: onChangeProps,
    defaultInputValue,
  } = props;
  const [textStyle, setTextStyle] = useState(defaultTextStyle);

  useEffect(() => {
    if (valueProps !== textStyle) {
      setTextStyle(valueProps || defaultTextStyle);
    }
  }, [valueProps]);

  return (
    <div>
      <AntInputNumber
        value={textStyle?.size || ''}
        defaultValue={defaultInputValue}
        suffix='px'
        style={{ width: '30%', marginBottom: '12px' }}
        onChange={(e) => {
          setTextStyle((prev) => {
            const newData = { ...prev, size: e };
            onChangeProps(newData);
            return newData;
          });
        }}
      />
      <div className='ant-input-text-style'>
        <div className='ant-input-text'>
          {textAligns.map((textAlign) => (
            <div
              className={`ant-input-text_item ant-input-text_item-${
                textAlign.value === textStyle.align ? 'active' : ''
              }`}
              key={textAlign.id}
              onClick={() => {
                setTextStyle((prev) => {
                  const newData = { ...prev, align: textAlign.value };
                  onChangeProps(newData);
                  return newData;
                });
              }}>
              {textAlign.icon}
            </div>
          ))}
        </div>
        <div
          className={`ant-input-text_item ant-input-text_item-${
            textStyle.weight === 'bold' ? 'active' : ''
          }`}
          onClick={() => {
            setTextStyle((prev) => {
              const fontWeight = prev.weight === 'bold' ? 'normal' : 'bold';
              const newData = { ...prev, weight: fontWeight };
              onChangeProps(newData);
              return newData;
            });
          }}>
          <BiBold />
        </div>
        <div
          className={`ant-input-text_item ant-input-text_item-${
            textStyle.style === 'italic' ? 'active' : ''
          }`}
          onClick={() => {
            setTextStyle((prev) => {
              const fontStyle = prev.style === 'italic' ? 'normal' : 'italic';
              const newData = { ...prev, style: fontStyle };
              onChangeProps(newData);
              return newData;
            });
          }}>
          <BiItalic />
        </div>

        <div className='ant-input-text_item'>
          <BasicPickColor
            value={textStyle.color}
            onChange={(value) => {
              setTextStyle((prev) => {
                const newValue = { ...prev, color: value };
                onChangeProps(newValue);
                return newValue;
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InputTextStyle;

InputTextStyle.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  defaultInputValue: PropTypes.string,
};

InputTextStyle.defaultProps = {
  value: {},
};
