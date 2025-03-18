import { DownOutlined, UpOutlined } from '@ant-design/icons';
import React from 'react';
import AntCheckbox from 'src/@crema/component/AntCheckbox';
import AntDatePicker from 'src/@crema/component/AntDatePicker';
import { useIntl } from 'react-intl';
import { disabledDateBeforeToday } from 'src/shared/utils/ui';

export const HeaderCollapse = ({
  id,
  title,
  isOpenPanel,
  verifyRequests,
  setVerifyRequests,
}) => {
  const { messages } = useIntl();
  const isChecked = (verifyRequests || []).some(
    (item) => item?.organization_id === id,
  );

  const onCheck = (e) => {
    e.stopPropagation();
    const checked = e.target.checked;
    if (!checked) {
      const removeArr = verifyRequests.filter(
        (item) => item?.organization_id !== id,
      );
      setVerifyRequests(removeArr);
      return;
    }
    setVerifyRequests((prev) => [...prev, { organization_id: id }]);
  };

  /**
   * Updates the date property of a verify request with the given date.
   *
   * @return {void} This function does not return a value.
   * @param due_date
   */
  const onChangeDate = (due_date) => {
    setVerifyRequests(
      verifyRequests.map((item) => {
        if (item?.organization_id === id) {
          return {
            ...item,
            due_date,
          };
        }
        return item;
      }),
    );
  };
  return (
    <div className='d-flex items-center'>
      <AntCheckbox checked={isChecked} onClick={onCheck} />
      <span className='ml-2 mr-2'>{title}</span>
      {isOpenPanel ? <UpOutlined /> : <DownOutlined />}
      <div className='ml-auto' onClick={(e) => e.stopPropagation()}>
        <label>{messages['common.feedbackDate']}: </label>
        <AntDatePicker
          value={
            verifyRequests?.find((item) => item?.organization_id === id)
              ?.due_date
          }
          disabled={!isChecked}
          disabledDate={disabledDateBeforeToday}
          onChange={onChangeDate}
        />
      </div>
    </div>
  );
};
