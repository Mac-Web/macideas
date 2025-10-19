import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import TaskPage from "../components/TaskPage";
import SideItem from "../components/SideItem";
import "./Tasks.css";

function Tasks() {
  const { id } = useParams();
  const [taskLists, setTaskLists] = useState(() => {
    const savedLists = JSON.parse(localStorage.getItem("macideas-tasks")) || [];
    return savedLists;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!taskLists[id]?.tasks) {
      navigate("/tasks");
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem("macideas-tasks", JSON.stringify(taskLists));
  }, [taskLists]);

  function handleNewList() {
    const newList = [...taskLists];
    newList[taskLists.length] = { tasks: [],completed:[], id: 0, name: "New List" };
    setTaskLists(newList);
    navigate(`/tasks/${taskLists.length}`);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 200 }} animate={{ opacity: 1, y: 0 }}>
      <title>Tasks | MacIdeas</title>
      <div className="tasks">
        <div className="tasks-sidebar">
          <h2 className="sidebar-title">Your Tasks</h2>
          <ul className="sidebar-list">
            {taskLists.length > 0 ? (
              taskLists.map((taskList, i) => {
                return <SideItem key={i} i={i} taskLists={taskLists} setTaskLists={setTaskLists} taskList={taskList} />;
              })
            ) : (
              <div className="message">No task lists. Create one below!</div>
            )}
          </ul>
          <div className="sidebar-create" onClick={handleNewList}>
            Create new list
          </div>
        </div>
        {taskLists[id] ? (
          <TaskPage taskLists={taskLists} setTaskLists={setTaskLists} id={parseInt(id) || 0} />
        ) : (
          <div className="message" style={{paddingLeft:"200px"}}>Create a new task list!</div>
        )}
      </div>
    </motion.div>
  );
}

export default Tasks;
