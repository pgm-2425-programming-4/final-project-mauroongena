import { useState } from "react";

function AddTask({ isOpen, onClose, onAdd, selectedProjectId, taskStatuses = [], taskLabels = [] }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [labels, setLabels] = useState([]);
  const [labelError, setLabelError] = useState("");

  function resetForm() {
    setTitle("");
    setDescription("");
    setStatus("");
    setLabels([]);
    setLabelError("");
  }


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
    resetForm();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="edit-dialog-backdrop">
      <div className="edit-dialog">
        <h2 className="dialog__title">Add Task</h2>
        <form className="form" onSubmit={handleSubmit}>
        <div className="form__row">
          <label className="form__label">
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form__input input"
            />
          </label>
        </div>
        <div className="form__row">
         <label className="form__label">
            Status:
            <div className="select">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="form__input"
              >
                <option value="">-- Select Status --</option>
                {taskStatuses.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
           
          </label>
        </div>
          
        <div className="form__row form__row--full">
          <label className="form__label">
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="form__input textarea"
            />
          </label>
        </div>
        
       <div className="form__row form__row--full">
        <label className="form__label">
          Labels:
          <div className="form__checkbox-group">
            {taskLabels.map((label) => {
              const isChecked = labels.includes(label.id);
              return (
                <label
                  key={label.id}
                  className={`form__checkbox-item ${isChecked ? 'selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    value={label.id}
                    checked={isChecked}
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
              );
            })}
          </div>
          {labelError && <p style={{ color: "red" }}>{labelError}</p>}
        </label>
      </div>

          <div className="form__actions addtask_buttons">
            <div className="action__buttons ">
              <button className="button is-outlined is-info is-dark" type="button" onClick={onClose}>Cancel</button>
              <button className="button is-link" type="submit">Add</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
