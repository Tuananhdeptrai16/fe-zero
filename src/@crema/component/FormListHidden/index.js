import React from 'react';
import { Form } from 'antd';

const FormListHidden = ({ name }) => {
  return (
    <Form.List name={name}>
      {() => {
        return <div></div>;
      }}
    </Form.List>
  );
};

FormListHidden.propTypes = {};

FormListHidden.defaultProps = {};

export default FormListHidden;
