import React, { forwardRef } from 'react';

const PrintImage = forwardRef(({ img_src }, ref) => {
  return (
    <div ref={ref} style={{ padding: '32px' }}>
      <img src={img_src} />
    </div>
  );
});

export default PrintImage;
