import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Tag, Tooltip } from 'antd';
import AntButton from 'src/@crema/component/AntButton';
import style from './FormAddListSynonym.module.scss';
import clsx from 'clsx';

FormAddListSynonym.propTypes = {
  tags: PropTypes.array,
  setTags: PropTypes.func,
};

function FormAddListSynonym({ tags = [], setTags }) {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div className={clsx(style.wrapFormAddListSynonym)}>
      <>
        {tags.map((tag) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag
              key={tag}
              color='gold'
              closable={true}
              onClose={() => handleClose(tag)}>
              <span>{isLongTag ? `${tag.slice(0, 20)}...` : tag}</span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {/*  */}
        {inputVisible && (
          <Input
            ref={inputRef}
            type='text'
            className={clsx(style.inputImportText)}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <AntButton
            icon={<PlusOutlined />}
            className={clsx(style.btnAddTag)}
            onClick={showInput}>
            Tạo mới từ đồng nghĩa
          </AntButton>
        )}
      </>
    </div>
  );
}

export default FormAddListSynonym;
