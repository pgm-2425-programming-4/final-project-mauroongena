import { useState } from "react";
import EditTaskDialog from "./EditTaskDialog";

function TaskItem({ task, taskStatuses, taskLabels, onSaveSuccess }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className="task">
      <span className="task__title">{task.title}</span>
      <span className="task__description">{task.description}</span>
      <span className="task-labels">
        {task.task_labels.map((label) => (
          <span key={label.id} className="task-label">
            {label.title}
          </span>
        ))}
      </span>
      <button onClick={() => setIsEditing(true)}>Edit</button>

      {isEditing && (
        <EditTaskDialog
          task={task}
          taskStatuses={taskStatuses}
          taskLabels={taskLabels} 
          onClose={() => setIsEditing(false)}
          onSaveSuccess={() => {
            onSaveSuccess?.();
            setIsEditing(false);
          }}
        />
      )}
    </li>
  );
}

export default TaskItem;

