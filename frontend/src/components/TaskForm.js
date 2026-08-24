import { useState ,useEffect} from "react";

const initialFormData = {
  title: "",
  description: "",
  priority: "medium",
};

function TaskForm({ onSubmitTask, isSubmitting, taskToEdit, onCancelEdit}) {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setFormData({

        title: taskToEdit.title,
        
        description: taskToEdit.description,

        priority: taskToEdit.priority,
      });

    } else {
      setFormData({

        ...initialFormData,
      });
    }
  
    setFormError("");

  }, [taskToEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({

      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = formData.title.trim();

    const description = formData.description.trim();

    if (!title || !description) {
      setFormError("Title and description are required");

      return;

    }

    setFormError("");

    const wasSaved = await onSubmitTask({
      title,
      description,
      priority: formData.priority,

    });

    if (wasSaved) {
      setFormData({
        ...initialFormData,
      });

    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{taskToEdit ? "Edit Task" : "Add Task"}</h2>

      {formError && (
        <p role="alert">{formError}</p>
      )}

      <div className="form-field">
        <label htmlFor="task-title">Title</label>
        <input
          id="task-title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-field">
        <label htmlFor="task-description">
          Description
        </label>
        <textarea
          id="task-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-field">
        <label htmlFor="task-priority">Priority</label>
        <select
          id="task-priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          disabled={isSubmitting}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : taskToEdit ? "Save changes" : "Add Task"}
      </button>

      {taskToEdit && (
        <button
            type="button"
            onClick={onCancelEdit}
            disabled={isSubmitting}
        >
            Cancel
        </button>
        )}
    </form>
  );
}

export default TaskForm;