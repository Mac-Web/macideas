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
  const [filterValue, setFilterValue] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState(tasks.tasks);
  const [sortValue, setSortValue] = useState("create");
  //TODO: change it to only one state managing all the properties of the new task
  const iconRef = useRef();
  const calendarRef = useRef();
  const dateIconRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (!calendarRef.current?.contains(e.target) && e.target !== dateIconRef.current) {
        setCalendar(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    setFilterValue("all");
  }, [id]);

  useEffect(() => {
    setTasks(taskLists[id] || blankList);
    let newTasks;
    switch (filterValue) {
      case "all":
        newTasks = tasks.tasks;
        break;
      case "starred":
        newTasks = tasks.tasks.filter((task) => task.starred);
        break;
      default:
        newTasks = tasks.tasks.filter((task) => task.labels.includes(filterValue));
        break;
    }
    switch (sortValue) {
      case "create":
        newTasks.sort((a, b) => new Date(a.created) - new Date(b.created));
        break;
      case "priority":
        newTasks.sort((a, b) => b.priority - a.priority);
        break;
      case "date":
        newTasks.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "starred":
        newTasks.sort((a, b) => b.starred - a.starred);
        break;
      case "name":
        newTasks.sort((a, b) => a.task.localeCompare(b.task));
        break;
      default:
        break;
    }
    setFilteredTasks(newTasks);
    setTaskId(taskLists[id]?.id || 0);
  }, [id, taskLists]);

  useEffect(() => {
    let newTasks;
    switch (filterValue) {
      case "all":
        newTasks = tasks.tasks;
        break;
      case "starred":
        newTasks = tasks.tasks.filter((task) => task.starred);
        break;
      default:
        newTasks = tasks.tasks.filter((task) => task.labels.includes(filterValue));
        break;
    }
    switch (sortValue) {
      case "create":
        newTasks.sort((a, b) => new Date(a.created) - new Date(b.created));
        break;
      case "priority":
        newTasks.sort((a, b) => b.priority - a.priority);
        break;
      case "date":
        newTasks.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "starred":
        newTasks.sort((a, b) => b.starred - a.starred);
        break;
      case "name":
        newTasks.sort((a, b) => a.task.localeCompare(b.task));
        break;
      default:
        break;
    }
    setFilteredTasks(newTasks);
  }, [filterValue]);

  useEffect(() => {
    switch (sortValue) {
      case "create":
        setFilteredTasks([...filteredTasks].sort((a, b) => new Date(a.created) - new Date(b.created)));
        break;
      case "priority":
        setFilteredTasks([...filteredTasks].sort((a, b) => b.priority - a.priority));
        break;
      case "date":
        setFilteredTasks([...filteredTasks].sort((a, b) => new Date(a.date) - new Date(b.date)));
        break;
      case "starred":
        setFilteredTasks([...filteredTasks].sort((a, b) => b.starred - a.starred));
        break;
      case "name":
        setFilteredTasks([...filteredTasks].sort((a, b) => a.task.localeCompare(b.task)));
        break;
      default:
        break;
    }
  }, [sortValue]);

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
        created: new Date(),
      };
      if (taskList) {
        setTasks({ ...tasks, tasks: [...taskList, newTask], id: taskId + 1 });
      } else {
        setTasks({ ...tasks, tasks: [newTask], id: taskId + 1 });
      }
      setTaskId(taskId + 1);
      setTaskInput("");
      setPriorityLevel(0);
      setDate(null);
      setLabels([]);
      setStarred(false);
    }
  }

  return (
    <div className="tasks-content">
      <div className="tasks-filters">
        <input type="text" placeholder={"Search tasks in " + taskLists[id].name} className="filter-bar" />
        <div className="tasks-filter">
          <img src="/macideas/icons/filter.svg" title="Filter by" className="filter-icon" />
          <select className="filter-dropdown" value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
            <option value="all">All</option>
            <option value="starred">Starred</option>
            {labels.map((label) => {
              return <option value={label}>{label}</option>;
            })}
          </select>
        </div>
        <div className="tasks-filter">
          <img src="/macideas/icons/sort.svg" title="Sort by" className="filter-icon" />
          <select className="filter-dropdown" value={sortValue} onChange={(e) => setSortValue(e.target.value)}>
            <option value="create">Date created</option>
            <option value="priority">Priority</option>
            <option value="date">Due date</option>
            <option value="starred">Starred</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
      <div className="tasks-lists">
        <div className="tasks-list">
          <AnimatePresence mode="sync">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, i) => {
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
