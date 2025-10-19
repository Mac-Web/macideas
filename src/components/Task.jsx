import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import TaskIcon from "./TaskIcon";
import { useEffect, useRef, useState } from "react";
import LabelList from "./LabelList";

function Task({ task, tasks, setTasks, star, priority, tag, id, labels, setLabels, completed = false, time = null }) {
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task);
  const [starred, setStarred] = useState(star);
  const [priorityLevel, setPriorityLevel] = useState(priority);
  const [displayed, setDisplayed] = useState(tag);
  const [labelList, setLabelList] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [date, setDate] = useState(time || new Date());
  //TODO: change it so it passes the entire task object as a prop so only one state is needed
  const taskTextRef = useRef();
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
    if (editing) {
      taskTextRef.current.focus();
    }
  }, [taskTextRef, editing]);

  useEffect(() => {
    setText(task);
    setStarred(star);
    setPriorityLevel(priority);
  }, [task, star]);

  useEffect(() => {
    if (labelList) {
      let newList = [...tasks.tasks];
      newList.find((t) => t.id === id).labels = displayed;
      setTasks({ ...tasks, tasks: newList });
    }
  }, [displayed]);

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

  function handlePriority(e) {
    let newList = [...tasks.tasks];
    newList.find((t) => t.id === id).priority = e.target.value;
    setTasks({ ...tasks, tasks: newList });
    setPriorityLevel(e.target.value);
  }

  function handleDate(date) {
    setDate(date);
    let newList = [...tasks.tasks];
    newList.find((t) => t.id === id).date = date;
    setTasks({ ...tasks, tasks: newList });
    setCalendar(false);
  }

  function handleClearDate() {
    setDate(null);
    let newList = [...tasks.tasks];
    newList.find((t) => t.id === id).date = null;
    setTasks({ ...tasks, tasks: newList });
    setCalendar(false);
  }

  function handleStar() {
    if (starred) {
      let newList = [...tasks.tasks];
      newList.find((t) => t.id === id).starred = false;
      setTasks({ ...tasks, tasks: newList });
    } else {
      let newList = [...tasks.tasks];
      newList.find((t) => t.id === id).starred = true;
      setTasks({ ...tasks, tasks: newList });
    }
    setStarred(!starred);
  }

  function handleSave() {
    setEditing(false);
    let newList = [...tasks.tasks];
    newList.find((t) => t.id === id).task = text;
    setTasks({ ...tasks, tasks: newList });
  }

  function handleDelete() {
    setTasks({
      ...tasks,
      tasks: tasks.tasks.filter((task) => task.id !== id),
      completed: tasks.completed?.filter((task) => task.id !== id),
    });
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
        title={completed ? "Uncomplete task" : "Complete task"}
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
        <>
          <div className="task-info">
            <div className="task-text">{text}</div>
            {time && (
              <div className="task-date">
                {new Date(time).getMonth() + 1}/{new Date(time).getDate()}/{new Date(time).getFullYear()}
              </div>
            )}
          </div>
          <select
            className={`task-tag ${priorityLevel ? "p-" + priorityLevel : ""}`}
            value={priorityLevel}
            onChange={(e) => handlePriority(e)}
          >
            <option value="0">None</option>
            <option value="1">Low</option>
            <option value="2">Mid</option>
            <option value="3">High</option>
          </select>
          <div className="task-labels">
            {displayed.sort().map((display) => {
              if (labels.includes(display)) {
                return (
                  <div className="task-label" title="Task label">
                    {display}
                  </div>
                );
              }
            })}
          </div>
          {labelList && (
            <LabelList
              setLabelList={setLabelList}
              labels={labels}
              displayed={displayed}
              setLabels={setLabels}
              setDisplayed={setDisplayed}
              icon={iconRef.current}
            />
          )}
          {calendar && (
            <div ref={calendarRef} className="task-calendar">
              <DatePicker selected={date} onChange={(date) => handleDate(date)} inline />
              {time && (
                <div className="clear-calendar" onClick={handleClearDate}>
                  Clear date
                </div>
              )}
            </div>
          )}
        </>
      )}
      <div className="task-icons">
        {!completed && (
          <>
            <TaskIcon src="/macideas/icons/date.svg" onClick={() => setCalendar(true)} ref={dateIconRef} title="Add date" />
            <TaskIcon src="/macideas/icons/tag.svg" ref={iconRef} onClick={() => setLabelList(true)} title="Edit labels" />
            <TaskIcon
              src={`/macideas/icons/star${starred ? "red" : ""}.svg`}
              onClick={handleStar}
              title={starred ? "Unstar task" : "Star task"}
            />
            <TaskIcon src="/macideas/icons/edit.svg" onClick={() => setEditing(true)} title="Edit task" />
          </>
        )}
        <TaskIcon src="/macideas/icons/delete.svg" onClick={handleDelete} title="Delete task" />
      </div>
    </motion.div>
  );
}

export default Task;
