import { useEffect, useState } from "react";
import Task from "../components/Task";

function TaskPage({ taskLists, setTaskLists, id }) {
  const [tasks, setTasks] = useState(taskLists[id] || { tasks: [], id: 0, name: "New List" });
  const [taskId, setTaskId] = useState(taskLists[id]?.id || 0);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    setTasks(taskLists[id] || { tasks: [], id: 0, name: "New List" });
    setTaskId(taskLists[id]?.id || 0);
  }, [id]);

  useEffect(() => {
    localStorage.setItem("macideas-tasks", JSON.stringify(taskLists));
  }, [taskLists]);

  useEffect(() => {
    setTaskLists([...taskLists.slice(0, id), tasks, ...taskLists.slice(id + 1)]);
  }, [tasks]);

  function handleSubmit(e) {
    e.preventDefault();
    if (taskInput.trim().length > 0) {
      let taskList = tasks.tasks;
      let newTask = { task: taskInput.trim(), id: taskId };
      if (taskList) {
        setTasks({ ...tasks, tasks: [...taskList, newTask], id: taskId + 1 });
      } else {
        setTasks({ ...tasks, tasks: [newTask], id: taskId + 1 });
      }
      setTaskId(taskId + 1);
      setTaskInput("");
    }
  }

  return (
    <div className="tasks-content">
      <div className="tasks-list">
        {tasks.tasks?.length > 0 ? (
          tasks.tasks.map((task, i) => {
            return <Task key={i} task={task.task} tasks={tasks} setTasks={setTasks} id={task.id} />;
          })
        ) : (
          <div className="message">No tasks added. Create one below!</div>
        )}
      </div>
      <form className="tasks-bar" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={taskInput}
          onInput={(e) => setTaskInput(e.target.value)}
          placeholder="Enter your task here"
          className="tasks-input"
        />
      </form>
    </div>
  );
}

export default TaskPage;
