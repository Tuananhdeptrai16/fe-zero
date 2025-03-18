import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { REDIRECT_LAYOUT_TYPES } from 'src/shared/constants/DataTableType';
import AntImage from 'src/@crema/component/AntImage';
import './input-layout-type.styles.less';
const InputLayoutType = (props) => {
  const { onChange: onChangeProps, value: valueProps } = props;
  const [layoutType, setLayoutType] = useState(valueProps);

  useEffect(() => {
    if (valueProps !== layoutType) {
      setLayoutType(valueProps);
    }
  }, [valueProps]);

  return (
    <div className='input-layout-type-container_images'>
      {REDIRECT_LAYOUT_TYPES.map(({ code, image, title }) => (
        <div
          key={code}
          className={`input-layout-type-image-item input-layout-type-image-item-${
            code === layoutType ? 'active' : ''
          }`}
          onClick={() => {
            setLayoutType(code);
            onChangeProps(code);
          }}>
          <AntImage src={image} preview={false} />
          <p className='image-item__title'>{title}</p>
        </div>
      ))}
    </div>
  );
};

export default InputLayoutType;

InputLayoutType.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
};
