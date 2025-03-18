import React from 'react';
import PropTypes from 'prop-types';
import AntButton from '../AntButton';

CustomComponentFileLoad.propTypes = {
  src: PropTypes.string,
};

function CustomComponentFileLoad({ src, fileName }) {
  const handleDownloadFile = () => {
    const link = document.createElement('a');
    link.href = src;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
  };
  return (
    <div className='text-center'>
      <h4
        style={{
          color: 'red',
        }}>
        Tập tin không hỗ trợ xem trước, Vui lòng chọn tải xuống file để xem chi
        tiết !
      </h4>
      <AntButton onClick={handleDownloadFile} type='primary'>
        Tải xuống file
      </AntButton>
    </div>
  );
}

export default CustomComponentFileLoad;
