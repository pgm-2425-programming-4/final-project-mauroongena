import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import EditTaskDialog from "./EditTaskDialog";
import Pencil from "../assets/svg/pencil-svgrepo-com.svg";

function TaskItem({ task, taskStatuses, taskLabels, projectId, selectedLabel, onSaveSuccess }) {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const handleSaveSuccess = async () => {
    await queryClient.invalidateQueries(["tasks", projectId, selectedLabel]);
    onSaveSuccess();
    setIsEditing(false);
  };

  return (
    <li className="task">
      <span className="task__title">{task.title}</span>
      <span className="task__description">{task.description}</span>
      <span className="task-labels">
        {task.task_labels.map((label) => (
          <span key={label.id} className="task-label">{label.title}</span>
        ))}
      </span>
      <button className="edit__button" onClick={() => setIsEditing(true)}><img className="inline__svg pencil__svg" src={Pencil} alt="pencil svg" /> Edit</button>

      {isEditing && (
        <EditTaskDialog
          task={task}
          taskStatuses={taskStatuses}
          taskLabels={taskLabels}
          onClose={() => setIsEditing(false)}
          onSaveSuccess={handleSaveSuccess}
        />
      )}
    </li>
  );
}

export default TaskItem;
