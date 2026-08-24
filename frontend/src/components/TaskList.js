import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

function TaskList({tasks, onToggleTask, onDeleteTask, onEditTask, processingTaskId, emptyMessage,}) {
  const taskCount = tasks.length;
  const taskIds = tasks.map((task) => task.id).join(",");

  const [currentIndex, setCurrentIndex] = useState(
    taskCount > 1 ? 1 : 0
  );
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isMoving, setIsMoving] = useState(false);

  const [isPaused, setIsPaused] = useState(false);

  const carouselTasks =
    taskCount > 1
      ? [tasks[taskCount - 1], ...tasks, tasks[0]]
      : tasks;

  useEffect(() => {
    setTransitionEnabled(false);
    setCurrentIndex(taskCount > 1 ? 1 : 0);

    setIsMoving(false);

    const frameId = requestAnimationFrame(() => {
      setTransitionEnabled(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, [taskCount, taskIds]);

  useEffect(() => {
    if (taskCount <= 1 || isPaused || isMoving) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setTransitionEnabled(true);

      setIsMoving(true);
      setCurrentIndex((index) => index + 1);

    }, 3500);

    return () => clearInterval(intervalId);
  }, [taskCount, taskIds, isPaused, isMoving]);

  const moveCarousel = (direction) => {
    if (taskCount <= 1 || isMoving) {
      return;
    }

    setTransitionEnabled(true);

    setIsMoving(true);

    setCurrentIndex((index) => index + direction);

  };

  const handleTransitionEnd = (event) => {
    if (event.target !== event.currentTarget) {
      return;

    }
    if (taskCount <= 1) {
        setTransitionEnabled(false);
        setCurrentIndex(0);
        setIsMoving(false);
        return;
    }


    if (currentIndex === 0) {
      setTransitionEnabled(false);

      setCurrentIndex(taskCount);

    }

    if (currentIndex === taskCount + 1) {
      setTransitionEnabled(false);
      setCurrentIndex(1);

    }

    setIsMoving(false);
  };

  if (taskCount === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <section
      className="task-carousel"
      aria-label="Task carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="task-carousel_viewport">
        <div
          className="task-carousel_track"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition:
            taskCount > 1 && transitionEnabled
                ? "transform 550ms ease-in-out"
                : "none",
          }}
        >
          {carouselTasks.map((task, index) => (
            <div
              className="task-carousel_slide"
              key={`${task.id}-${index}`}
            >
              <TaskItem
                task={task}
                onToggleTask={onToggleTask}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
                isProcessing={
                  processingTaskId === task.id
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="task-carousel_controls">
        <button
          type="button"
          onClick={() => moveCarousel(-1)}
          disabled={taskCount <= 1 || isMoving}
          aria-label="Previous task"
        >
          Previous
        </button>

        <span>
          {taskCount} {taskCount === 1 ? "task" : "tasks"}
        </span>

        <button
          type="button"
          onClick={() => moveCarousel(1)}
          disabled={taskCount <= 1 || isMoving}
          aria-label="Next task"
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default TaskList;