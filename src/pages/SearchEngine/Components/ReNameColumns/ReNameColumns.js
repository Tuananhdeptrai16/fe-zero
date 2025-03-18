import { Col, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import AntButton from 'src/@crema/component/AntButton';
import style from './RenameColumn.module.scss';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { DoubleRightOutlined } from '@ant-design/icons';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormContent from 'src/@crema/component/FormContent';
import { NEW_COLUMNS } from 'src/shared/constants/ActionTypes';
import {
  CHECK_ACCENTED_CHARACTERS,
  SPECIAL_CHARACTERS,
  TRIM_SPACE,
  UPPERCASE_CHARACTERS,
} from 'src/shared/constants/Regex';

ReNameColumns.propTypes = {
  prevStep: PropTypes.func,
  nextStep: PropTypes.func,
};

function ReNameColumns({ prevStep, nextStep }) {
  const [isDuplicateRename, setIsDuplicateRename] = useState(false);
  const [checkUpperCaseRename, setCheckUpperCaseRename] = useState(false);
  const oldRenameColumns = useSelector(
    (state) => state?.common?.dataSourceAddIndex?.newColumns,
  );

  const dispatch = useDispatch();
  const listColumns = useSelector(
    (state) => state?.common?.dataSourceAddIndex?.listColumns,
  );
  const chooseColumns = useSelector(
    (state) => state?.common?.dataSourceAddIndex?.chooseColumns,
  );

  const dataColumnOld = listColumns?.filter((item) => {
    return chooseColumns.includes(item?.key);
  });

  const dataTableRender = dataColumnOld.map((item, index) => {
    return {
      index: index + 1,
      newColumn: item?.name,
      ...item,
    };
  });

  const [newColumn, setNewColumn] = useState(
    oldRenameColumns?.length > 0 &&
      oldRenameColumns?.length === dataTableRender?.length
      ? oldRenameColumns
      : dataTableRender,
  );

  const listDuplicates = [];
  for (let i = 0; i < newColumn.length; i++) {
    for (let j = i + 1; j < newColumn.length; j++) {
      if (newColumn[i]?.newColumn === newColumn[j]?.newColumn) {
        listDuplicates?.push(newColumn[j]);
      }
    }
  }
  useEffect(() => {
    if (listDuplicates?.length > 0) {
      setIsDuplicateRename(true);
    } else {
      setIsDuplicateRename(false);
    }
  }, [listDuplicates?.length]);

  const isEmptyNewColumn = newColumn?.filter((item) => {
    return (
      item?.newColumn === '' ||
      CHECK_ACCENTED_CHARACTERS.test(item?.newColumn) ||
      UPPERCASE_CHARACTERS.test(item?.newColumn) ||
      TRIM_SPACE.test(item?.newColumn) ||
      SPECIAL_CHARACTERS.test(item?.newColumn)
    );
  });

  useEffect(() => {
    if (isEmptyNewColumn?.length > 0) {
      setCheckUpperCaseRename(true);
    } else {
      setCheckUpperCaseRename(false);
    }
  }, [isEmptyNewColumn]);

  const handleClickContinue = () => {
    dispatch({
      type: NEW_COLUMNS,
      payload: newColumn,
    });
    nextStep();
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 60,
      align: 'center',
    },
    {
      title: 'Tên cột gốc',
      dataIndex: 'name',
      render: (data) => {
        return (
          <div className={clsx(style.wrapColumnOld)}>
            <span>{data}</span>
            <div>
              <DoubleRightOutlined />
              <DoubleRightOutlined />
            </div>
          </div>
        );
      },
    },
    {
      title: 'Tên cột thay thế',
      dataIndex: 'id',
      width: 500,
      render: (_, record) => {
        return (
          <FormContent
            className={clsx(style.wrapFormContent)}
            initialValues={{
              [record.name]: record?.newColumn,
            }}>
            <FormInput
              required
              labelHidden='Tên cột thay thế'
              placeholder='Nhập tên cột thay thế'
              rules={{
                check_accented_characters: [],
                uppercase_character: [],
                trim_space: [],
                special_characters: [],
              }}
              name={record?.name}
              onChange={(e) => {
                let newColumnChange = e?.target?.value;
                const newRecord = {
                  ...record,
                  newColumn: newColumnChange,
                };
                setNewColumn((prev) => {
                  const index = prev?.findIndex((item) => {
                    return item?.key === newRecord?.key;
                  });
                  if (index === -1) {
                    return [...prev, newRecord];
                  } else {
                    const dataNew = [...prev];
                    dataNew[index].newColumn = newColumnChange;
                    return dataNew;
                  }
                });
              }}
            />
          </FormContent>
        );
      },
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row gutter={[16, 8]}>
            <Col span={12}>
              <h4
                style={{
                  marginTop: '10px',
                }}>
                Thay đổi tên thay thế cho các cột
              </h4>
            </Col>
            <Col span={12}></Col>
          </Row>
        </Col>
        <Col span={24}>
          <Table pagination={false} columns={columns} dataSource={newColumn} />
          {isDuplicateRename && (
            <p
              style={{
                color: 'red',
                marginTop: '6px',
              }}>
              Tên cột thay thế không được trùng lặp nhau !
            </p>
          )}
          {checkUpperCaseRename && (
            <p
              style={{
                color: 'red',
                marginTop: '6px',
              }}>
              Tên cột thay thế không được có kí tự viết hoa !
            </p>
          )}
          <div className={clsx(style.actions)}>
            <AntButton onClick={prevStep}>Quay lại</AntButton>
            {
              <AntButton
                disabled={
                  isEmptyNewColumn?.length > 0 || listDuplicates?.length > 0
                    ? true
                    : false
                }
                onClick={handleClickContinue}
                type='primary'>
                Tiếp theo
              </AntButton>
            }
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ReNameColumns;
