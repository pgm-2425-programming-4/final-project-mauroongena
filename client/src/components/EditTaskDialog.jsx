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

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const confirmDelete = async () => {
    setIsDeleting(true);
    onClose();
    onSaveSuccess?.();

    try {
      await deleteTask(task.documentId);
    } catch {
      
      console.log("");
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
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__row">
              <label className="form__label">
                Title:
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
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
                    name="task_status"
                    value={formData.task_status}
                    onChange={handleChange}
                    required
                    className="form__input"
                  >
                    <option value="">-- Select Status --</option>
                    {taskStatuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.title}
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
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
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
                    const isChecked = formData.task_labels.includes(label.id);
                    return (
                      <label
                        key={label.id}
                        className={`form__checkbox-item ${isChecked ? "selected" : ""}`}
                      >
                        <input
                          type="checkbox"
                          value={label.id}
                          checked={isChecked}
                          onChange={(e) => handleCheckboxChange(e, label.id)}
                        />
                        {label.title}
                      </label>
                    );
                  })}
                </div>
                {labelError && <p style={{ color: "red" }}>{labelError}</p>}
              </label>
            </div>

            <div className="form__actions edittask_buttons">
                <button
                  className="button is-danger"
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              <div className="action__buttons">

                <button
                  className="button is-outlined is-info is-dark"
                  type="button"
                  onClick={onClose}
                  disabled={isDeleting}
                >
                  Cancel
                </button>

                <button
                  className="button is-primary"
                  type="submit"
                  disabled={isPending || isDeleting}
                >
                  {isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="edit-dialog-backdrop" style={{ zIndex: 1100 }}>
          <div className="edit-dialog" style={{ maxWidth: "400px" }}>
            <p>
              Are you sure you want to delete task{" "}
              <strong>"{task.title}"</strong>?
            </p>
            <div className="form__actions" style={{ justifyContent: "flex-end", gap: "1rem" }}>
              <button
                className="button is-light"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                No
              </button>
              <button
                className="button is-danger"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditTaskDialog;
