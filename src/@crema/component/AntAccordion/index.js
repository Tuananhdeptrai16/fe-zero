import React from 'react';
import { Collapse } from 'antd';
import PropTypes from 'prop-types';

const { Panel } = Collapse;
const AntAccordion = (props) => {
  const { items, forceRender, ...rest } = props;
  return (
    <Collapse {...rest} accordion style={{ marginBottom: '12px' }}>
      {items.map((item, index) => (
        <Panel
          key={`panel-item-${index}`}
          header={item.header}
          forceRender={forceRender}>
          {item.content}
        </Panel>
      ))}
    </Collapse>
  );
};

export default AntAccordion;

AntAccordion.propTypes = {
  items: PropTypes.array,
  forceRender: PropTypes.bool,
};
