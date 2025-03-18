import React from 'react';
// import useIntl from 'react-intl/lib/src/components/useIntl';
import FormInput from 'src/@crema/core/Form/FormInput';
import clsx from 'clsx';
import style from './FormBasisAPI.module.scss';
import { Collapse } from 'antd';

const { Panel } = Collapse;
function FormBasisAPI() {
  // const { messages } = useIntl();

  return (
    <div className={clsx(style.wrapFormBasic)}>
      <FormInput label='Source name' name='source_name' required />
      <FormInput label='Username' name='user_name' required />
      <FormInput label='Password' name='password' type='password' />

      <FormInput label='api_url' name='api_url' required />
      <FormInput label='api_path' name='api_path' required />

      <Collapse ghost>
        <Panel header='Optional fields' key='1'>
          <FormInput label='payload' name='payload_option' />
        </Panel>
      </Collapse>
    </div>
  );
}

export default FormBasisAPI;
