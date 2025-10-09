import { motion } from "framer-motion";

function TaskIcon({ src, onClick, title = null }) {
  return <motion.img whileHover={{ scale: 1.2, y: -2 }} src={src} className="task-icon" onClick={onClick} title={title} />;
}

export default TaskIcon;
