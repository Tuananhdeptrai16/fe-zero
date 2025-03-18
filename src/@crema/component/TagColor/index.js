import React from 'react';
import { Button, Tag } from 'antd';
import { classList } from 'src/shared/utils/ui';

import styles from './style.module.scss';

const TagColor = ({ className, active, ...props }) => {
  if (active) {
    return (
      <div className={classList(className, styles.tagColor, styles.active)}>
        <Tag {...props}></Tag>
      </div>
    );
  }

  return (
    <Tag className={classList(className, styles.tagColor)} {...props}></Tag>
  );
};

export default TagColor;

TagColor.propsTypes = Button.propTypes;
