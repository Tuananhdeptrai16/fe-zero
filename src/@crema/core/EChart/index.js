import React, { useEffect, useRef, useState } from 'react';
import { Typography } from 'antd';
import * as echarts from 'echarts';

const optionBasic = {
  textStyle: {
    fontFamily: 'roboto',
  },
};

const EChart = ({ title, option, width, height, on, callback }) => {
  const chartRef = useRef();
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current); // echarts theme
    chart.setOption({ ...option, ...optionBasic, resizeObserver }, true); // second param is for 'noMerge'
    setChart(chart);

    if (on) {
      Object.keys(on).forEach((keyEvent) => {
        chart.on(keyEvent, on[keyEvent](chart));
      });
    }
    if (callback) {
      callback(chart);
    }
    if (resizeObserver) resizeObserver.observe(chartRef.current);
  }, [option]);
  console.log('chart', chart);
  return (
    <div>
      <Typography.Title level={4} className='px-4 text-center'>
        {title}
      </Typography.Title>
      <div ref={chartRef} style={{ width, height }}></div>
    </div>
  );
};

const resizeObserver = new window.ResizeObserver((entries) => {
  entries.map(({ target }) => {
    const instance = echarts.getInstanceByDom(target);
    if (instance) {
      instance.resize();
    }
  });
});

EChart.propTypes = {};

EChart.defaultProps = {};

export default React.memo(EChart);
