import { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  toggleTask,
  updateTask,
} from "./services/taskService";

import TaskFilter from "./components/TaskFilter";


import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks,setTasks] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [error,setError] = useState("");
  const [processingTaskId,setProcessingTaskId] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        setError("");

        const taskData = await getTasks();
        setTasks(taskData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };


    loadTasks();
  }, []);

  
  
  const handleSubmitTask = async (taskData) => {
    try {
      setIsSubmitting(true);
      setError("");
  
      if (taskToEdit) {
        const updatedTask = await updateTask(

          taskToEdit.id,
          
          taskData

        );
  
        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task.id === updatedTask.id
              ? updatedTask
              : task

          )
        );
  
        setTaskToEdit(null);

      } else {
        const newTask = await createTask(taskData);
  
        setTasks((currentTasks) => [
          ...currentTasks,
          newTask,

        ]);
      }
  
      return true;
    } catch (error) {
      setError(error.message);

      return false;

    } finally {
      setIsSubmitting(false);

    }
  };


  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setError("");

  };
  


  const handleCancelEdit = () => {
    setTaskToEdit(null);

  };

  const handleToggleTask = async (taskId) => {
    try {
      setProcessingTaskId(taskId);

      setError("");
  
      const updatedTask = await toggleTask(taskId);
  

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId ? updatedTask : task
        )
      );

    } catch (error) {
      setError(error.message);

    } finally {
      setProcessingTaskId(null);
    }

  };


  const handleDeleteTask = async (taskId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"

    );
  
    if (!isConfirmed) {
      return;
    }
  
    try {
      setProcessingTaskId(taskId);

      setError("");
  

      await deleteTask(taskId);
  
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId)
      );

      if (taskToEdit?.id === taskId) {
        setTaskToEdit(null);
        
      }

    } catch (error) {
      setError(error.message);

    } finally {
      setProcessingTaskId(null);
    }
  };




  const priorityOrder = {
    low: 1,
    medium: 2,
    high: 3,
  };
  
  const filteredTasks = tasks
    .filter((task) => {
      if (activeFilter === "completed") {
        return task.completed;
      }
  
      if (activeFilter === "pending") {
        return !task.completed;
      }
  
      return true;
    })
    .filter((task) => {
      const query = searchQuery.trim().toLowerCase();
  
      if (!query) {
        return true;
      }
  
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    });
  
  const visibleTasks = [...filteredTasks].sort(
    (firstTask, secondTask) => {
      if (sortOption === "oldest") {
        return (
          new Date(firstTask.createdAt) - new Date(secondTask.createdAt)
        );
      }
  
      if (sortOption === "priority-high") {
        return (
          priorityOrder[secondTask.priority] - priorityOrder[firstTask.priority]
        );
      }
  
      if (sortOption === "priority-low") {
        return (
          priorityOrder[firstTask.priority] - priorityOrder[secondTask.priority]
        );
      }
  
      return (
        new Date(secondTask.createdAt) - new Date(firstTask.createdAt)
      );
    }
  );




  return (
    <main className="app-shell">
      <h1>Task Manager</h1>

      {error && <p role="alert">{error}</p>}

      {isLoading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          <TaskForm
            onSubmitTask={handleSubmitTask}
            isSubmitting={isSubmitting}
            taskToEdit={taskToEdit}
            onCancelEdit={handleCancelEdit}
          />


          <TaskFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortOption={sortOption}
            onSortChange={setSortOption}
          />

          <TaskList 
          tasks={visibleTasks} 
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          processingTaskId={processingTaskId}
          onEditTask={handleEditTask}
          emptyMessage={tasks.length === 0 ? "No tasks yet." : "No tasks match this filter."}
          />
        </>
      )}
    </main>
  );
}

export default App;

