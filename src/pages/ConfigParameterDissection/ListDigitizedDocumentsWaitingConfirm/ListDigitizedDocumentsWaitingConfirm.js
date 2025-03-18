import React from 'react';
import { RenderDateTime } from 'src/@crema/component/TableRender';
import style from './ListDigitizedDocumentsWaitingConfirm.module.scss';
import clsx from 'clsx';
import RawDocument from 'src/pages/rawDocument';

function ListDigitizedDocumentsWaitingConfirm() {
  const dateTimeCurrentUpdate = new Date();
  return (
    <>
      <RawDocument isListDigitizedWaitingConfirm={true} />
      {/* time update ocr*/}
      <div className={clsx(style.wrapTimeUpdateOcr)}>
        <h4 className={clsx(style.wrapTimeUpdateOcr_title)}>
          Thời gian cập nhật:
        </h4>
        <span>
          <RenderDateTime value={dateTimeCurrentUpdate} />
        </span>
      </div>
    </>
  );
}

export default ListDigitizedDocumentsWaitingConfirm;
