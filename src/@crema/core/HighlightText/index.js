import React from 'react';
import PropTypes from 'prop-types';
import { nonAccentVietnamese } from 'src/shared/utils/String';
import Highlighter from 'react-highlight-words';

const HighlightText = ({ textToHighlight, searchText, ...attrs }) => {
  return (
    <Highlighter
      searchWords={(searchText.trim() || '').split(' ')}
      autoEscape={true}
      sanitize={(text) =>
        nonAccentVietnamese((text ?? '').toLowerCase()).trim()
      }
      textToHighlight={textToHighlight}
      {...attrs}></Highlighter>
  );
};

HighlightText.propTypes = {
  textToHighlight: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
};

HighlightText.defaultProps = {};

export default HighlightText;
