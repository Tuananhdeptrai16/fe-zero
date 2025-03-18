import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './index.style.less';

function TaskCard({ task }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className='workspaceDraggingHover workspaceTaskWrapper d-flex items-center'>
        {task?.label}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='workspaceTaskWrapper d-flex items-center cursor-grab relative'>
      <p className='workspaceTaskLabel w-full'>{task?.label}</p>
    </div>
  );
}

export default TaskCard;
