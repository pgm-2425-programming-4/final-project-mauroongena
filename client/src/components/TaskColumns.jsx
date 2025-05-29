import TaskItem from "./TaskItem";

function TaskColumns({ taskStatuses, tasksByStatus }) {
  return (
    <div className="task-columns">
      {taskStatuses.map((status) => {
        const statusTitle = status.title || status?.title;
        if (statusTitle === "Backlog") return null;
        const tasksForStatus = tasksByStatus[statusTitle] || [];
        return (
          <div key={statusTitle} className="task-column">
            <h3>{statusTitle}</h3>
            <ul>
              {tasksForStatus.length > 0 ? (
                tasksForStatus.map((task) => <TaskItem key={task.id} task={task} />)
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