import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Task from "../components/Task";

const blankList = { tasks: [], completed: [], id: 0, name: "New List" };

function TaskPage({ taskLists, setTaskLists, id }) {
  const [tasks, setTasks] = useState(taskLists[id] || blankList);
  const [taskId, setTaskId] = useState(taskLists[id]?.id || 0);
  const [taskInput, setTaskInput] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setTasks(taskLists[id] || blankList);
    setTaskId(taskLists[id]?.id || 0);
  }, [id, taskLists]);

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
      <div className="tasks-lists">
        <div className="tasks-list">
          <AnimatePresence mode="sync">
            {tasks.tasks?.length > 0 ? (
              tasks.tasks.map((task, i) => (
                <Task key={i} task={task.task} tasks={tasks} setTasks={setTasks} star={task.starred} id={task.id} />
              ))
            ) : (
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} layout className="message">
                No tasks added. Create one below!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {completed && (
          <div className="tasks-completed">
            <AnimatePresence mode="sync">
              {tasks.completed?.length > 0 ? (
                tasks.completed.map((task) => (
                  <Task key={task.id} task={task.task} tasks={tasks} setTasks={setTasks} id={task.id} completed={true} />
                ))
              ) : (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} layout className="message">
                  No completed tasks. Go get some work done!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      <div className="completed-btn" onClick={() => setCompleted(!completed)}>
        <img
          src="/macideas/icons/caret.svg"
          className="completed-img"
          style={{ transform: `rotate(${completed ? "-90deg" : "0deg"})` }}
        />
        Completed ({tasks.completed?.length || 0})
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
