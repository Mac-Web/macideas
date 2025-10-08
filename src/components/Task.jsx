import { motion } from "framer-motion";
import TaskIcon from "./TaskIcon";
import { useEffect, useRef, useState } from "react";

function Task({ task, tasks, setTasks, id, completed = false }) {
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task);
  const taskTextRef = useRef();

  useEffect(() => {
    if (editing) {
      taskTextRef.current.focus();
    }
  }, [taskTextRef, editing]);

  function handleComplete() {
    if (completed) {
      const newCompleted = tasks.completed.filter((task) => task.id !== id);
      const newList = [...tasks.tasks, tasks.completed.find((task) => task.id == id)];
      setTasks({ ...tasks, tasks: newList, completed: newCompleted });
    } else {
      const newList = tasks.tasks.filter((task) => task.id !== id);
      const newCompleted = [...tasks.completed, tasks.tasks.find((task) => task.id == id)];
      setTasks({ ...tasks, tasks: newList, completed: newCompleted });
    }
  }

  function handleEdit() {
    setEditing(true);
  }

  function handleSave() {
    setEditing(false);
    let newList = [...tasks.tasks];
    newList.find((t) => t.id === id).task = text;
    setTasks({ ...tasks, tasks: newList });
  }

  function handleDelete() {
    setTasks({ ...tasks, tasks: tasks.tasks.filter((task) => task.id !== id) });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 0, scale: 0 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ x: "70%", opacity: 0 }}
      className={completed ? "tasks-item completed-item" : "tasks-item"}
      layout
    >
      <img
        src={hover || completed ? "/macideas/icons/check.svg" : "/macideas/icons/uncheck.svg"}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleComplete}
        className="task-img"
      />
      {editing ? (
        <input
          ref={taskTextRef}
          onKeyDown={(e) => {
            if (e.key == "Enter") handleSave();
          }}
          onBlur={handleSave}
          onInput={(e) => setText(e.target.value)}
          value={text}
          className="text-input"
        />
      ) : (
        <div className="task-text">{text}</div>
      )}
      <div className="task-icons">
        {!completed&&<TaskIcon src="/macideas/icons/edit.svg" onClick={handleEdit} />}
        <TaskIcon src="/macideas/icons/delete.svg" onClick={handleDelete} />
      </div>
    </motion.div>
  );
}

export default Task;
