import React, { useCallback, useState } from 'react';
import { Divider, Space, Spin, Typography } from 'antd';
import {
  closestCenter,
  closestCorners,
  DndContext,
  DragOverlay,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useListPagePermission } from 'src/hooks/useListPagePermission';
import WorkspaceTaskCard from 'src/pages/profile/UserProfile/WorkspaceSetting/WorkspaceTaskCard';
import { ContainerWorkspace } from 'src/pages/profile/UserProfile/WorkspaceSetting/ContainerWorkspace';
import AntButton from 'src/@crema/component/AntButton';
import { useIntl } from 'react-intl';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import useCallApi from 'src/@crema/hook/useCallApi';
import { updateConfigWorkspace } from 'src/@crema/services/workspace.service';
import notification from 'src/shared/utils/notification';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import useEffectDepth from 'src/@crema/hook/useEffectDepth';

export function customCollisionDetectionAlgorithm(args) {
  const closestCornersCollisions = closestCorners(args);
  const closestCenterCollisions = closestCenter(args);
  const pointerWithinCollisions = pointerWithin(args);

  if (
    closestCornersCollisions.length > 0 &&
    closestCenterCollisions.length > 0 &&
    pointerWithinCollisions.length > 0
  ) {
    return pointerWithinCollisions;
  }

  return null;
}

const KEY = {
  ROOT: 'root',
  WORKSPACE: 'workspace',
};

const defaultCols = [
  {
    id: KEY.ROOT,
    title: 'Các mục có thể cấu hình',
  },
  {
    id: KEY.WORKSPACE,
    title: 'Bàn làm việc',
  },
];

export const WorkspaceSetting = () => {
  const { user } = useAuthUser();
  const { messages } = useIntl();
  const { listPageName } = useListPagePermission();

  const { data, isLoading } = useFetch(
    {
      url: API.SEARCH_WORKSPACE_USER(user?.id),
      enabled: !!user?.id,
    },
    [user?.id],
  );

  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState();

  const { send, loading } = useCallApi({
    callApi: updateConfigWorkspace,
    success: () => notification.success('Cấu hình bàn làm việc thành công'),
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  // Find corresponding object in arr2 based on id
  const mergeArrays = useCallback((arr1, arr2) => {
    return arr2
      .map((item2) => {
        const matchingItem = arr1.find(
          (item1) => item1?.page_name === item2?.id,
        );
        if (matchingItem) {
          return {
            ...item2,
            index: matchingItem?.index,
            columnId: KEY.WORKSPACE,
          };
        }
        return {
          ...item2,
          index: matchingItem?.index,
          columnId: KEY.ROOT,
        };
      })
      .filter(Boolean); // Remove any null values
  }, []);

  useEffectDepth(() => {
    const dataWorkspace = data?.result || [];
    const newTasks = mergeArrays(dataWorkspace, listPageName);

    setTasks(newTasks);
  }, [data, listPageName, mergeArrays]);

  const onUpdateWorkspace = async () => {
    const workspaceItems = tasks
      .filter((item) => item.columnId === KEY.WORKSPACE)
      .map((item, index) => ({
        page_name: item?.id,
        index,
      }));
    await send({ userId: user?.id, data: workspaceItems });
  };

  return (
    <div>
      <Typography.Title level={4}>
        Thay đổi vị trí, mục trong bàn làm việc
      </Typography.Title>
      <Spin spinning={loading || isLoading}>
        <div className={'d-flex flex-row'}>
          <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            collisionDetection={customCollisionDetectionAlgorithm}
            onDragOver={onDragOver}>
            <div className='d-flex gap-4'>
              <div className='d-flex gap-4'>
                {defaultCols.map((col) => (
                  <ContainerWorkspace
                    key={col.id}
                    column={col}
                    tasks={tasks
                      .filter((task) => task.columnId === col.id)
                      ?.sort((a, b) => a?.index - b?.index)}
                  />
                ))}
              </div>
            </div>
            <DragOverlay>
              {activeTask ? <WorkspaceTaskCard task={activeTask} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </Spin>
      <Divider />
      <Space>
        <AntButton
          type={'primary'}
          onClick={onUpdateWorkspace}
          loading={loading}>
          {messages['dialog.button.save']}
        </AntButton>
      </Space>
    </div>
  );

  function onDragStart(event) {
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
    }
  }

  function onDragEnd(event) {
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;
    setTasks((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const currentOverIndex = tasks.findIndex((t) => t.id === overId);
      const overIndex = currentOverIndex === -1 ? 0 : currentOverIndex;
      if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
        tasks[activeIndex].columnId = tasks[overIndex].columnId;
        return arrayMove(tasks, activeIndex, overIndex - 1);
      }

      return arrayMove(tasks, activeIndex, overIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isActiveATask) return;

    //  dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === 'Column';
    //  dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
};
