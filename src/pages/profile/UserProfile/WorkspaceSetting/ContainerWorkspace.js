import React, { useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import WorkspaceTaskCard from 'src/pages/profile/UserProfile/WorkspaceSetting/WorkspaceTaskCard';
import './index.style.less';
import AppScrollbar from 'src/@crema/core/AppScrollbar';
import { Badge } from 'antd';

export function ContainerWorkspace({ column, tasks }) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: 'Column',
    },
  });

  return (
    <div ref={setNodeRef} className='workspaceColWrapper d-flex flex-col'>
      {/* Column title */}
      <div
        className={'workspaceColContent d-flex items-center justify-between'}>
        <div className='d-flex gap-2 items-center'>
          {/*<div className='d-flex justify-center items-center workspaceColTitle'>*/}
          {/*  {tasks.length}*/}
          {/*</div>*/}
          <Badge
            showZero
            count={tasks.length}
            color={'#007bec'}
            style={{ fontWeight: 'bold' }}
          />
          {column.title}
        </div>
      </div>

      {/* Column task container */}
      <AppScrollbar style={{ maxHeight: 600 }}>
        <div className='d-flex flex-grow flex-col gap-4 p-2'>
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <WorkspaceTaskCard key={task?.messageId} task={task} />
            ))}
          </SortableContext>
        </div>
      </AppScrollbar>
    </div>
  );
}
