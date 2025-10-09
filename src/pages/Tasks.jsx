import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import TaskPage from "../components/TaskPage";
import SideItem from "../components/SideItem";
import "./Tasks.css";

function Tasks() {
  const { id } = useParams();
  const [taskLists, setTaskLists] = useState(JSON.parse(localStorage.getItem("macideas-tasks")) || []);

  return (
    <motion.div initial={{ opacity: 0, y: 200 }} animate={{ opacity: 1, y: 0 }}>
      <title>Tasks | MacIdeas</title>
      <div className="tasks">
        <div className="tasks-sidebar">
          <h2 className="sidebar-title">Your Tasks</h2>
          <ul className="sidebar-list">
            {taskLists.map((taskList, i) => {
              return <SideItem key={i} i={i} taskLists={taskLists} setTaskLists={setTaskLists} taskList={taskList} />;
            })}
          </ul>
        </div>
        <TaskPage taskLists={taskLists} setTaskLists={setTaskLists} id={parseInt(id) || 0} />
      </div>
    </motion.div>
  );
}

export default Tasks;
