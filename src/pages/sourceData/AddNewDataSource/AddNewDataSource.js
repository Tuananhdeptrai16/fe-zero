import React, { useState } from 'react';
// import useIntl from 'react-intl/lib/src/components/useIntl';
import FormInput from 'src/@crema/core/Form/FormInput';
import clsx from 'clsx';
import style from './AddNewDataSource.module.scss';
import { Collapse } from 'antd';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { Switch } from 'antd';
// import FormInputPassword from 'src/@crema/core/Form/FormInputPassword';

const { Panel } = Collapse;
function AddNewDataSource({ setIsUserAgent }) {
  // const { messages } = useIntl();
  // const onChange = (key) => {
  //   console.log(key);
  // };
  const [valueChangeStorageProvider, setValueChangeStorageProvider] =
    useState('');
  const onChangeSwitch = (checked) => {
    setIsUserAgent(`switch to ${checked}`);
  };
  const handleChangeStorageProvider = (value) => {
    setValueChangeStorageProvider(value);
  };

  console.log({ valueChangeStorageProvider });

  return (
    <div className={clsx(style.wrapFormAddDataSource)}>
      <FormInput
        label='Source name'
        name='source_name'
        required
        // rules={{ email: [] }}
        // placeholder={messages['table.source_name']}
      />
      <FormInput label='Dataset Name' name='dataset_name' required />
      {/* <FormInputPassword label='PassWord' name='PassWord' /> */}
      <FormSelect
        label='File Format'
        name='file_format'
        required
        options={[
          { value: 'csv', label: 'csv' },
          { value: 'json', label: 'json' },
        ]}
      />

      {/*  */}
      <div className={clsx(style.wrapStorageProvider)}>
        <div className={clsx(style.storageProvider_header)}>
          <label className={clsx(style.label)}>Storage Provider</label>
          <FormSelect
            className={clsx(style.formSelect)}
            onChange={handleChangeStorageProvider}
            name='Service_Account_JSON'
            options={[
              { value: 'HTTPS_Public_Web', label: 'HTTPS: Public Web' },
              {
                value: 'GCS_Google_Cloud_Storage',
                label: 'GCS: Google Cloud Storage',
              },
            ]}
          />
        </div>
        {/* collapse */}
        <div className={clsx(style.storageProvider_main)}>
          {valueChangeStorageProvider === 'HTTPS_Public_Web' ? (
            <Collapse ghost className={clsx(style.formCollapse)}>
              <Panel header='Optional fields' key='11'>
                <div className={clsx(style.wrapSwitchForm)}>
                  <Switch
                    id='useAgent'
                    name='switch'
                    onChange={onChangeSwitch}
                  />
                  <label htmlFor='useAgent'>User-Agent</label>
                </div>
              </Panel>
            </Collapse>
          ) : (
            <Collapse ghost className={clsx(style.formCollapse)}>
              <Panel header='Optional fields' key='11'>
                <FormInput
                  label='Service Account JSON'
                  name='Service_Account_JSON1'
                />
              </Panel>
            </Collapse>
          )}
        </div>
      </div>

      {/*  */}
      <FormInput label='URL' name='url' required />

      <Collapse ghost>
        <Panel header='Optional fields' key='1'>
          <FormInput label='Reader Options' name='option_payload' />
        </Panel>
      </Collapse>
    </div>
  );
}

export default AddNewDataSource;
