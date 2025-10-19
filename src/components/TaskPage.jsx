import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Task from "../components/Task";
import TaskIcon from "./TaskIcon";
import LabelList from "./LabelList";

const blankList = { tasks: [], completed: [], id: 0, name: "New List" };

function TaskPage({ taskLists, setTaskLists, id }) {
  const [tasks, setTasks] = useState(taskLists[id] || blankList);
  const [taskId, setTaskId] = useState(taskLists[id]?.id || 0);
  const [taskInput, setTaskInput] = useState("");
  const [completed, setCompleted] = useState(false);
  const [labels, setLabels] = useState(JSON.parse(localStorage.getItem("macideas-labels")) || []);
  const [starred, setStarred] = useState(false);
  const [priorityLevel, setPriorityLevel] = useState(0);
  const [labelList, setLabelList] = useState(false);
  const [displayed, setDisplayed] = useState([]);
  const [calendar, setCalendar] = useState(false);
  const [date, setDate] = useState(null);
  //TODO: change it to only one state managing all the properties of the new task
  const iconRef = useRef();
  const calendarRef = useRef();
  const dateIconRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (!calendarRef.current.contains(e.target) && e.target !== dateIconRef.current) {
        setCalendar(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    setTasks(taskLists[id] || blankList);
    setTaskId(taskLists[id]?.id || 0);
  }, [id, taskLists]);

  useEffect(() => {
    setTaskLists([...taskLists.slice(0, id), tasks, ...taskLists.slice(id + 1)]);
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("macideas-labels", JSON.stringify(labels));
  }, [labels]);

  function handleSubmit(e) {
    e.preventDefault();
    if (taskInput.trim().length > 0) {
      let taskList = tasks.tasks;
      let newTask = {
        task: taskInput.trim(),
        priority: priorityLevel,
        date: date,
        labels: displayed,
        starred: starred,
        id: taskId,
      };
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
              tasks.tasks.map((task, i) => {
                return (
                  <Task
                    key={i}
                    task={task.task}
                    tasks={tasks}
                    setTasks={setTasks}
                    priority={task.priority || 0}
                    tag={task.labels}
                    star={task.starred}
                    id={task.id}
                    labels={labels}
                    setLabels={setLabels}
                    time={task.date ? task.date : null}
                  />
                );
              })
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
                tasks.completed.map((task) => {
                  return (
                    <Task
                      key={task.id}
                      task={task.task}
                      tasks={tasks}
                      setTasks={setTasks}
                      priority={task.priority || 0}
                      tag={task.labels}
                      id={task.id}
                      completed={true}
                      labels={labels}
                      setLabels={setLabels}
                      time={task.date ? task.date : null}
                    />
                  );
                })
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
      {labelList && (
        <div className="form-labels">
          <LabelList
            setLabelList={setLabelList}
            labels={labels}
            displayed={displayed}
            setLabels={setLabels}
            setDisplayed={setDisplayed}
            icon={iconRef.current}
          />
        </div>
      )}
      <form className="tasks-bar" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={taskInput}
          onInput={(e) => setTaskInput(e.target.value)}
          placeholder="Enter your task here"
          className="tasks-input"
        />
        {calendar && (
          <div className="task-calendar" ref={calendarRef}>
            <DatePicker
              selected={date}
              onChange={(date) => {
                setDate(date);
                setCalendar(false);
              }}
              inline
            />
            <div className="clear-calendar" onClick={() => setDate(null)}>
              Clear date
            </div>
          </div>
        )}
        <div className="task-icons">
          <select
            className={`task-tag ${priorityLevel ? "p-" + priorityLevel : ""}`}
            value={priorityLevel}
            onChange={(e) => setPriorityLevel(e.target.value)}
            title="Set priority"
          >
            <option value="0">None</option>
            <option value="1">Low</option>
            <option value="2">Mid</option>
            <option value="3">High</option>
          </select>
          <TaskIcon src="/macideas/icons/date.svg" ref={dateIconRef} onClick={() => setCalendar(true)} title="Add date" />
          <TaskIcon src="/macideas/icons/tag.svg" ref={iconRef} onClick={() => setLabelList(true)} title="Edit labels" />
          <TaskIcon
            src={`/macideas/icons/star${starred ? "red" : ""}.svg`}
            onClick={() => setStarred(!starred)}
            title={starred ? "Unstar task" : "Star task"}
          />
        </div>
      </form>
    </div>
  );
}

export default TaskPage;
