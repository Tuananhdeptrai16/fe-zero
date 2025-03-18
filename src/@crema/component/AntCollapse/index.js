import React from 'react';
import { Collapse } from 'antd';
export const { Panel } = Collapse;
const AntAccordion = ({ accordion = true, ...rest }) => {
  return <Collapse accordion={accordion} {...rest} />;
};

export default AntAccordion;
