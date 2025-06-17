import { useState } from "react";

function AddTask({ isOpen, onClose, onAdd, selectedProjectId, taskStatuses = [], taskLabels = [] }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [labels, setLabels] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const newTask = {
      title,
      description,
      task_status: status,
      project: selectedProjectId,
      task_labels: labels,
    };
    onAdd(newTask);
  }

  if (!isOpen) return null;

  return (
    <div className="add-task-modal">
      <div className="add-task-modal__content">
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select status</option>
            {taskStatuses.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>

          <select
            multiple
            value={labels}
            onChange={(e) => setLabels(Array.from(e.target.selectedOptions, (o) => o.value))}
          >
            {taskLabels.map((label) => (
              <option key={label.id} value={label.id}>
                {label.title}
              </option>
            ))}
          </select>

          <div className="add-task-modal__actions">
            <button type="submit">Add</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
