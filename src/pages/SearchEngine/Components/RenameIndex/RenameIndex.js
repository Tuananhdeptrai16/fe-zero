import { Col, Row } from 'antd';
import React, { useState } from 'react';
import AntButton from 'src/@crema/component/AntButton';
import style from './RenameIndex.module.scss';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import AntInput from 'src/@crema/component/AntInput';
import { useDispatch, useSelector } from 'react-redux';
import { RENAME_INDEX } from 'src/shared/constants/ActionTypes';

RenameIndex.propTypes = {
  prevStep: PropTypes.func,
  nextStep: PropTypes.func,
};

function RenameIndex({ prevStep, nextStep }) {
  const valueOldRenameIndex = useSelector(
    (state) => state?.common?.dataSourceAddIndex?.renameIndex,
  );
  const [valueInputChangeName, setValueInputChangeName] = useState(
    valueOldRenameIndex ? valueOldRenameIndex : '',
  );
  const [statusInput, setStatusInput] = useState(false);
  const [messageError, setMessageError] = useState('');
  const dispatch = useDispatch();
  const handelChangeInput = (e) => {
    setStatusInput(false);
    setValueInputChangeName(e.target.value);
  };

  const handleOK = () => {
    if (valueInputChangeName.trim() === '') {
      setStatusInput(true);
      setMessageError('Tên chỉ mục không được để trống !');
    } else {
      if (/[\u0080-\uFFFF]/.test(valueInputChangeName.trim())) {
        setStatusInput(true);
        setMessageError('Tên chỉ mục không nhập kí tự có dấu !');
      } else if (/[A-Z]/.test(valueInputChangeName.trim())) {
        setStatusInput(true);
        setMessageError('Tên chỉ mục không được có kí tự viết hoa !');
      } else if (/\s/.test(valueInputChangeName.trim())) {
        setStatusInput(true);
        setMessageError('Khoảng trắng phải cách nhau bằng kí tự _');
      } else if (/[!@#$%^&*(),.?":{}|<>]/.test(valueInputChangeName.trim())) {
        setStatusInput(true);
        setMessageError('Tên chỉ mục không được chứa ký tự đặc biệt !');
      } else if (!/[a-zA-Z]/.test(valueInputChangeName.trim())) {
        setStatusInput(true);
        setMessageError('Tên chỉ mục phải chứa ít nhất một ký tự là chữ !');
      } else {
        setStatusInput(false);
        setMessageError('');
        dispatch({ type: RENAME_INDEX, payload: valueInputChangeName.trim() });
        nextStep();
      }
    }
  };

  return (
    <div>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <h4
                style={{
                  marginTop: '10px',
                }}>
                Thay đổi tên chỉ mục
              </h4>
            </Col>
            <Col span={12}></Col>
          </Row>
        </Col>
        <Col span={24}>
          <div className={clsx(clsx(style.renameIndex_content))}>
            <label
              htmlFor='input_name_index'
              className={clsx(style.main_header__label)}>
              Tên chỉ mục:
            </label>
            <div className={clsx(style.wrapInput)}>
              <AntInput
                id='input_name_index'
                allowClear
                placeholder='Nhập tên chỉ mục'
                value={valueInputChangeName}
                onChange={handelChangeInput}
                onPressEnter={handleOK}
                status={statusInput ? 'error' : null}
              />
              {statusInput && (
                <span className={clsx(style.errorMessage)}>{messageError}</span>
              )}
            </div>
          </div>
          <div className={clsx(style.actions)}>
            <AntButton onClick={prevStep}>Quay lại</AntButton>
            {
              <AntButton onClick={handleOK} type='primary'>
                Tiếp theo
              </AntButton>
            }
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default RenameIndex;
