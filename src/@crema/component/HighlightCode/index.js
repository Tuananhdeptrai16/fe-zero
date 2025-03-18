import { CopyOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { highlightTheme } from 'src/@crema/core/AppComponentCard/highlightTheme';
import { copyStringToClipboard } from '../../../shared/utils/Clipboard';
import IntlMessages from '../../utility/IntlMessages';

import styles from './style.module.scss';

const HighlightCode = ({ content, ...attrs }) => {
  const onCopy = () => {
    notification.success('Đã copy thành công');
    copyStringToClipboard(content);
  };

  return (
    <div className={styles.highlightCode}>
      <Highlight
        {...defaultProps}
        {...attrs}
        code={content}
        language='jsx'
        theme={highlightTheme}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className='pre-tag'
            style={{
              ...style,
              maxHeight: 500,
              padding: '12px',
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap',
            }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={i} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Tooltip
        onClick={onCopy}
        className={`${styles.action} pointer`}
        title={<IntlMessages id='copy code' />}>
        <CopyOutlined />
      </Tooltip>
    </div>
  );
};

HighlightCode.propTypes = {
  content: PropTypes.string,
};

HighlightCode.defaultProps = {};

export default HighlightCode;
