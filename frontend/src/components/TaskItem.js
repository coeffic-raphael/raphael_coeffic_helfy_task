function TaskItem({task,onToggleTask,onDeleteTask,onEditTask,isProcessing,}) {
    const formattedDate = new Date(
      task.createdAt
    ).toLocaleString();
  
    return (
      <article
        className={`task-item ${
          task.completed ? "task-item--completed" : ""
        }`}
      >
        <div className="task-item_header">
          <h2>{task.title}</h2>
  
          <span
            className={`priority priority-${task.priority}`}
          >
            {task.priority}
          </span>
        </div>
  
        <p className="task-item_description">
          {task.description}
        </p>
  
        <div className="task-item_meta">
          <span
            className={`status ${
              task.completed
                ? "status--completed"
                : "status--pending"
            }`}
          >
            {task.completed ? "Completed" : "Pending"}
          </span>
  
          <time dateTime={task.createdAt}>
            {formattedDate}
          </time>
        </div>
  
        <div className="task-item_actions">
          <button
            className="task-button task-button--toggle"
            type="button"
            onClick={() => onToggleTask(task.id)}
            disabled={isProcessing}
            aria-pressed={task.completed}
          >
            {isProcessing
              ? "Updating..."
              : task.completed
                ? "Mark pending"
                : "Complete"}
          </button>
  
          <button
            className="task-button task-button--edit"
            type="button"
            onClick={() => onEditTask(task)}
            disabled={isProcessing}
          >
            Edit
          </button>
  
          <button
            className="task-button task-button--delete"
            type="button"
            onClick={() => onDeleteTask(task.id)}
            disabled={isProcessing}
          >
            Delete
          </button>
        </div>
      </article>
    );
  }
  
  export default TaskItem;