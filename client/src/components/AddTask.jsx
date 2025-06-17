import { useState } from "react";

function AddTask({ isOpen, onClose, onAdd, selectedProjectId, taskStatuses = [], taskLabels = [] }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [labels, setLabels] = useState([]);
  const [labelError, setLabelError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (labels.length === 0) {
      setLabelError("Selecteer minstens één label!");
      return;
    }

    const newTask = {
      title,
      description,
      task_status: status,
      project: selectedProjectId,
      task_labels: labels,
    };
    onAdd(newTask);
    onClose(); // Reset after adding
  }

  if (!isOpen) return null;

  return (
    <div className="edit-dialog-backdrop">
      <div className="edit-dialog">
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <label>
            Labels:
            <div>
              {taskLabels.map((label) => (
                <label key={label.id}>
                  <input
                    type="checkbox"
                    value={label.id}
                    checked={labels.includes(label.id)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setLabels((prev) =>
                        checked
                          ? [...prev, label.id]
                          : prev.filter((id) => id !== label.id)
                      );
                    }}
                  />
                  {label.title}
                </label>
              ))}
            </div>
            {labelError && <p style={{ color: "red" }}>{labelError}</p>}
          </label>

          <label>
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">-- Select Status --</option>
              {taskStatuses.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </label>

          <div>
            <button type="submit">Add</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
