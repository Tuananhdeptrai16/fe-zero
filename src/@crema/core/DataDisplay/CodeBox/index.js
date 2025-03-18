import React from 'react';
import PropTypes from 'prop-types';

import { classList } from 'src/shared/utils/ui';

import './style.scss';
const CodeBoxTitle = ({ className, ...attrs }) => {
  return <div className={classList('code-box-title', className)} {...attrs} />;
};

const CodeBoxDescription = ({ className, ...attrs }) => {
  return (
    <div className={classList('code-box-description', className)} {...attrs} />
  );
};

const CodeBoxMeta = ({ className, ...attrs }) => {
  return <div className={classList('code-box-meta', className)} {...attrs} />;
};

const CodeBox = ({ className, ...attrs }) => {
  return <section className={classList(className, 'code-box')} {...attrs} />;
};

CodeBox.propTypes = {
  className: PropTypes.string,
};

CodeBox.defaultProps = {};

export default Object.assign(CodeBox, {
  CodeBoxTitle,
  CodeBoxDescription,
  CodeBoxMeta,
});
