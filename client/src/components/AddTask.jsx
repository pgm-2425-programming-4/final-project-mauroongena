import { useEffect, useRef, useState } from "react";

function AddTask({
  isOpen,
  onClose,
  onAdd,
  projects,
  selectedProjectId,
  taskStatuses,
  taskLabels,
}) {
  const dialogRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [labels, setLabels] = useState([]);
  const [projectId, setProjectId] = useState(selectedProjectId);
  const [labelError, setLabelError] = useState("");

  useEffect(() => {
    setProjectId(selectedProjectId);
  }, [selectedProjectId, isOpen]);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (labels.length === 0) {
      setLabelError("Selecteer minstens één label!");
      return;
    }
    setLabelError("");
    onAdd(
      {
        title,
        description,
        task_status: Number(status),
        task_labels: labels.map(Number),
        project: Number(projectId),
      },
      Number(projectId)
    );
    setTitle("");
    setDescription("");
    setStatus("");
    setLabels([]);
    setProjectId(selectedProjectId);
    onClose();
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setStatus("");
    setLabels([]);
    setProjectId(selectedProjectId);
    setLabelError("");
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      style={{
        padding: "2rem",
        width: "50rem",
        border: "none",
        borderRadius: 8,
      }}
    >
      <form
        className="add-task-form"
        onSubmit={handleSubmit}
        style={{ padding: "2rem" }}
      >
        <h2 className="add-task-title">Add new task</h2>
        <div className="add-task-row">
          <label>
            Title:
            <input
              className="input add-task__title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div className="add-task-row">
          <label>
            Description:
            <textarea
              className="textarea"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div className="add-task-row">
          <label className="select-label">
            Status:
            <div className="select">
              <select
                className="select-dropdown"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select status</option>
                {taskStatuses.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
          </label>
        </div>
        <div className="add-task-row">
          <label>
            Labels:
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              {taskLabels.map((label) => (
                <label
                  key={label.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <input
                    className="checkbox"
                    type="checkbox"
                    value={label.id}
                    checked={labels.includes(label.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setLabels([...labels, label.id]);
                        setLabelError("");
                      } else {
                        const newLabels = labels.filter((l) => l !== label.id);
                        setLabels(newLabels);
                        if (newLabels.length === 0) {
                          setLabelError("Selecteer minstens één label!");
                        }
                      }
                    }}
                  />
                  {label.title}
                </label>
              ))}
            </div>
            {labelError && (
              <span
                className="error-field"
                style={{ color: "red", marginTop: 4 }}
              >
                {labelError}
              </span>
            )}
          </label>
        </div>
        <div className="add-task-row">
          <label className="project-select">
            Project:
            <div className="select">
              <select
                className="select-dropdown"
                required
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
          </label>
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
          <button type="submit" className="button is-primary">
            Add
          </button>
          <button type="button" className="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default AddTask;
