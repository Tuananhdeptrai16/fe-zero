import React from 'react';
import RenderFileLoad from 'src/@crema/component/RenderFileLoad';

const PreviewPDF = ({ width = '100%', height, src, ...attrs }) => {
  return (
    <RenderFileLoad
      src={src}
      component={'iframe'}
      width={width}
      height={height}
      {...attrs}
    />
  );
};

PreviewPDF.propTypes = {};

PreviewPDF.defaultProps = {};

export default PreviewPDF;
