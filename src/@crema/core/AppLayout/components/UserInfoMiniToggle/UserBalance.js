import React from 'react';
import './userBalance.style.less';
import { useIntl } from 'react-intl';

const UserBalance = () => {
  const { messages } = useIntl();

  return (
    <div>
      <span className='cr-user-mini-toggle-balance-content'>
        <span className='cr-user-mini-toggle-name-balance'>
          <h3 className='cr-user-mini-toggle-name'>
            {messages['header.balance']}:{' '}
            <span className='cr-user-mini-toggle-balance-amount'>
              226.688 USD
            </span>
          </h3>
        </span>
      </span>
    </div>
  );
};

export default UserBalance;
