import * as React from 'react';

export const IconCall = ({ width = 36, height = 36, ...restProps }) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 37 36'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...restProps}>
    <circle cx={18.5} cy={18} r={18} fill='#FB3E3E' />
    <path
      d='M27.4 22.428v2.7a1.8 1.8 0 0 1-1.963 1.8c-2.77-.3-5.43-1.247-7.767-2.763a17.551 17.551 0 0 1-5.4-5.4 17.811 17.811 0 0 1-2.763-7.803A1.8 1.8 0 0 1 11.298 9h2.7a1.8 1.8 0 0 1 1.8 1.548c.114.864.326 1.713.63 2.53a1.8 1.8 0 0 1-.405 1.898L14.88 16.12a14.4 14.4 0 0 0 5.4 5.4l1.143-1.143a1.8 1.8 0 0 1 1.9-.405c.816.305 1.664.516 2.528.63a1.8 1.8 0 0 1 1.548 1.827Z'
      fill='#fff'
    />
  </svg>
);
