import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.style.less';
import { Skeleton } from 'antd';
import { isURL } from 'src/shared/utils/URL';
import { renderIconWorkSpace } from 'src/shared/constants/DataFixed';
import { truncate } from 'lodash';

const classItem = ['first', 'second', 'third', 'four'];

export const WorkspaceItem = ({ item, isLoading, index }) => {
  const nav = useNavigate();
  const onNavigate = (path) => {
    if (!isURL(path)) {
      nav(path);
      return;
    }
    window.location.href = path;
  };

  if (isLoading)
    return (
      <div className={'d-flex flex-col gap-2 pointer'}>
        <Skeleton.Button
          active
          className={'d-flex items-center justify-center workspaceItem w-full'}>
          <div className={'workspaceIcon'}></div>
        </Skeleton.Button>
        <Skeleton.Input className={'workspaceLabel'} size={'small'} active />
      </div>
    );
  return (
    <div
      className={'d-flex flex-col gap-2 pointer container_item'}
      onClick={() => onNavigate(item?.path)}>
      <div className={'workspaceItem'}>
        <div className={'workspaceIcon'}>
          <span className={`icon ${classItem[index % 4]}`}>
            {renderIconWorkSpace(item?.typeIconWorkspace)}
          </span>
        </div>
        <div className='workspaceContent'>
          <h3 className='label'>
            {truncate(item.text, { length: 55, omission: '...' })}
          </h3>
          <h4 className='descrision'>{`Phần mềm quản lý ${truncate(item.text, {
            length: 40,
            omission: '...',
          })}`}</h4>
        </div>
      </div>
    </div>
  );
};
