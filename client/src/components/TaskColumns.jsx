import TaskItem from "./TaskItem";

function TaskColumns({ taskStatuses, taskLabels, tasks, projectId, selectedLabel, onTaskSaved }) {
  const tasksByStatus = {};

  for (const task of tasks) {
    const statusTitle = task.task_status?.title || "Unknown";
    if (statusTitle === "Backlog") continue;
    if (!tasksByStatus[statusTitle]) tasksByStatus[statusTitle] = [];
    tasksByStatus[statusTitle].push(task);
  }

  return (
    <div className="task-columns">
      {taskStatuses.map((status) => {
        if (status.title === "Backlog") return null;
        const tasksForStatus = tasksByStatus[status.title] || [];

        return (
          <div key={status.title} className="task-column">
            <h3>{status.title}</h3>
            <ul className={`task-column__list${
              tasksForStatus.length > 1 ? " task-column__list--scrollable" : ""
            }`}>
              {tasksForStatus.length > 0 ? (
                tasksForStatus.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    taskLabels={taskLabels}
                    taskStatuses={taskStatuses}
                    projectId={projectId}
                    selectedLabel={selectedLabel}
                    onSaveSuccess={onTaskSaved}
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
