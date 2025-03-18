import React from 'react';
import { isImageURL, isPDFURL } from 'src/shared/utils/URL';
import PreviewPDF from 'src/@crema/core/DataDisplay/PreviewPDF';
import AntImage from 'src/@crema/component/AntImage';
import { Empty } from 'antd';

const DocumentDisplay = ({ src, ...attrs }) => {
  if (isPDFURL(src)) return <PreviewPDF src={src} {...attrs} />;
  if (isImageURL(src))
    return (
      <AntImage
        src={src}
        style={{
          objectFit: 'contain',
        }}
        preview={false}
        {...attrs}
      />
    );

  return (
    <div {...attrs}>
      <Empty description={src} />
    </div>
  );
};

DocumentDisplay.propTypes = {};

DocumentDisplay.defaultProps = {};

export default DocumentDisplay;
