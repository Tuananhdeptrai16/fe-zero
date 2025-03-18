import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const PrintContent = forwardRef(({ title, dataSource, columns }, ref) => {
  return (
    <div ref={ref} style={{ padding: '32px' }}>
      <h1>{title}</h1>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
});

PrintContent.propTypes = {
  title: PropTypes.string,
  dataSource: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

PrintContent.defaultProps = {
  title: 'Bảng dữ liệu',
};

export default PrintContent;
