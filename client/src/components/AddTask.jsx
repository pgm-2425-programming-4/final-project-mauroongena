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
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          height: "100%",
        }}
      >
        <h2
          className="add-task-title"
          style={{ gridColumn: "1 / -1", marginBottom: "1rem" }}
        >
          Add new task
        </h2>
        <div className="add-task-row" style={{ width: "100%"}}>
          <label style={{ width: "100%" }}>
            Title:
            <input
              className="input add-task__title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", backgroundColor: "#374357", marginTop: "0.5rem",}}
            />
          </label>
        </div>
        <div
          className="add-task-row"
          style={{
            display: "flex",
            gap: "1rem",
            width: "100%",
          }}
        >
          <label className="project-select" style={{ flex: 1 }}>
            Project:
            <div className="select" style={{marginTop: "0.5rem"}}>
              <select
                className="select-dropdown"
                disabled
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                style={{ width: "100%", backgroundColor: "#374357"}}
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <label className="select-label" style={{ flex: 1 }}>
            Status:
            <div className="select" style={{marginTop: "0.5rem"}}>
              <select
                className="select-dropdown"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ width: "100%", backgroundColor: "#374357"}}
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
        <div
          className="add-task-row"
          style={{
            display: "flex",
            gap: "1rem",
            width: "100%",
            alignItems: "flex-start", 
          }}
        >
          <label style={{ flex: 1 }}>
            Description:
            <textarea
              className="textarea"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", backgroundColor: "#374357", height: "200px", marginTop: "0.5rem", }}
            />
          </label>
          <label style={{ flex: 1 }}>
            Labels:
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginTop: "0.5rem",
                backgroundColor: "#374357",
                borderRadius: "4px",
                padding: "0.5rem"
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
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
          }}
        >
          <button type="submit" className="button" style = {{ backgroundColor: "#4d648d" }}>
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
