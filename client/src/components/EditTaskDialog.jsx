import { useState, useEffect } from "react";
import { useUpdateTask } from "../queries/useUpdateTask";

function EditTaskDialog({ task, taskStatuses, taskLabels = [], onClose, onSaveSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    task_status: "",
    task_labels: [],
  });

  const [labelError, setLabelError] = useState("");
  const { mutate: updateTask, isPending } = useUpdateTask();

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        task_status: task.task_status.id || "",
        task_labels: task.task_labels.map((label) => label.id) || [],
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e, labelId) => {
    const checked = e.target.checked;
    setFormData((prev) => {
      const updatedLabels = checked
        ? [...prev.task_labels, labelId]
        : prev.task_labels.filter((id) => id !== labelId);

      if (updatedLabels.length === 0) {
        setLabelError("Selecteer minstens één label!");
      } else {
        setLabelError("");
      }

      return {
        ...prev,
        task_labels: updatedLabels,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.task_labels.length === 0) {
      setLabelError("Selecteer minstens één label!");
      return;
    }

    const payload = {
      documentId: task.documentId,
      data: {
        title: formData.title,
        description: formData.description,
        task_status: Number(formData.task_status),
        task_labels: formData.task_labels,
      },
    };

    updateTask(payload, {
      onSuccess: () => {
        onSaveSuccess?.();
        onClose();
      },
    });
  };

  if (!task) return null;

  return (
    <div className="edit-dialog-backdrop">
      <div className="edit-dialog">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
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
                    checked={formData.task_labels.includes(label.id)}
                    onChange={(e) => handleCheckboxChange(e, label.id)}
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
              name="task_status"
              value={formData.task_status}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Status --</option>
              {taskStatuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.title}
                </option>
              ))}
            </select>
          </label>

          <div>
            <button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskDialog;
