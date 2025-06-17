import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { getTasksByProject } from "../queries/get-tasks-by-project";

function TaskColumns({ taskStatuses, taskLabels, projectId }) {
  const [tasksByStatus, setTasksByStatus] = useState({});

  const fetchTasks = async () => {
    try {
      const response = await getTasksByProject(projectId);
      const rawTasks = response.data || [];

      const grouped = {};

      for (let task of rawTasks) {
        const status = task.task_status;
        const statusTitle = status?.title;

        if (!statusTitle || statusTitle === "Backlog") continue;

        if (!grouped[statusTitle]) grouped[statusTitle] = [];
        grouped[statusTitle].push(task);
      }

      setTasksByStatus(grouped);
    } catch (err) {
      console.error("Error fetching project-specific tasks:", err);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchTasks();
    }
  }, [projectId]);

  return (
    <div className="task-columns">
      {taskStatuses.map((status) => {
        const statusTitle = status.title;
        if (statusTitle === "Backlog") return null;

        const tasksForStatus = tasksByStatus[statusTitle] || [];

        return (
          <div key={statusTitle} className="task-column">
            <h3>{statusTitle}</h3>
            <ul className="task-column__list">
              {tasksForStatus.length > 0 ? (
                tasksForStatus.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    taskLabels={taskLabels}
                    taskStatuses={taskStatuses}
                    onSaveSuccess={fetchTasks}
                  />
                ))
              ) : (
                <li style={{ color: "#fff" }}>No tasks added yet.</li>
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default TaskColumns;
