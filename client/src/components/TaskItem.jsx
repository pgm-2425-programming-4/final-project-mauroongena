function TaskItem({ task }) {
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
    </li>
  );
}

export default TaskItem;