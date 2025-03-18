import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'lodash';
import { decodeHTMlToText } from 'src/shared/utils/String';
import HTMLRender from 'src/@crema/component/HTMlRender';

const RenderContentHTML = ({
  shortNumWord,
  content = '',
  isShowHTML = false,
  ...attrs
}) => {
  const contentOnlyText = useMemo(() => {
    return decodeHTMlToText(content);
  }, [content]);

  const [isShowShortContent, setShowShortContent] = useState(
    contentOnlyText.length > shortNumWord,
  );
  const contentShow = useMemo(() => {
    if (isShowShortContent) {
      return truncate(contentOnlyText, { length: shortNumWord });
    } else {
      if (isShowHTML) {
        return <HTMLRender dangerouslySetInnerHTML={{ __html: content }} />;
      } else {
        return contentOnlyText;
      }
    }
  }, [isShowShortContent, contentOnlyText, shortNumWord, isShowHTML, content]);

  const isShortContentAble = useMemo(() => {
    return (
      contentOnlyText !== truncate(contentOnlyText, { length: shortNumWord })
    );
  }, [contentOnlyText, shortNumWord]);

  const showMoreContent = (e) => {
    e.preventDefault();
    setShowShortContent(false);
  };

  const showShortContent = (e) => {
    e.preventDefault();
    setShowShortContent(true);
  };
  return (
    <div {...attrs}>
      {contentShow}
      {isShortContentAble && isShowShortContent && (
        <a href='#' onClick={showMoreContent}>
          Xem thêm
        </a>
      )}

      {isShortContentAble && !isShowShortContent && (
        <a href='#' onClick={showShortContent}>
          Thu gọn
        </a>
      )}
    </div>
  );
};

RenderContentHTML.propTypes = {
  shortNumWord: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
};

RenderContentHTML.defaultProps = {};

export default RenderContentHTML;
