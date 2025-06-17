import { useState, useEffect } from "react";
import { useUpdateTask } from "../queries/useUpdateTask";
import { deleteTask } from "../queries/delete-task";

function EditTaskDialog({ task, taskStatuses, taskLabels = [], onClose, onSaveSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    task_status: "",
    task_labels: [],
  });

  const [labelError, setLabelError] = useState("");
  const { mutate: updateTask, isPending } = useUpdateTask();

  // State voor delete confirm popup en deleting status
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        task_status: task.task_status?.id || "",
        task_labels: task.task_labels?.map((label) => label.id) || [],
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

  const confirmDelete = async () => {
    setIsDeleting(true);

    // Sluit dialogs direct
    onClose();
    onSaveSuccess?.();

    try {
      await deleteTask(task.documentId);
    } catch (error) {
      console.error("Fout bij verwijderen taak:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!task) return null;

  return (
    <>
      <div className="edit-dialog-backdrop">
        <div className="edit-dialog">
          <h2 className="dialog__title">Edit Task</h2>
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

            <div className="form__actions" style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isDeleting}
                style={{ backgroundColor: "red", color: "white" }}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>

              <div>
                <button type="submit" disabled={isPending || isDeleting}>
                  {isPending ? "Saving..." : "Save"}
                </button>
                <button type="button" onClick={onClose} disabled={isDeleting}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Delete confirmation popup */}
      {showDeleteConfirm && (
        <div className="edit-dialog-backdrop" style={{ zIndex: 1100 }}>
          <div className="edit-dialog" style={{ maxWidth: "400px" }}>
            <p>
              Are you sure you want to delete task <strong>{task.title}</strong>?
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
              <button onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}>
                No
              </button>
              <button onClick={confirmDelete} disabled={isDeleting} style={{ backgroundColor: "red", color: "white" }}>
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditTaskDialog;
