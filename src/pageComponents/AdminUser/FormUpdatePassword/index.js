import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';

const FormUpdatePassword = () => {
  return (
    <div style={{ marginTop: '12px' }}>
      <FormInput
        name='password'
        type='password'
        label='common.password'
        tooltip={{
          title: 'Mật khẩu có độ dài 6 - 32 ký tự, bao gồm a-z,A-Z,0-9',
        }}
        rules={{ is_password: [] }}
        required
      />
      <FormInput
        name='confirm_password'
        type='password'
        label='common.retypePassword'
        tooltip={{
          title: 'Mật khẩu có độ dài 6 - 32 ký tự, bao gồm a-z,A-Z,0-9',
        }}
        required
        rules={{ is_password: [], confirmed: [{ field: 'password' }] }}
      />
    </div>
  );
};

export default FormUpdatePassword;
