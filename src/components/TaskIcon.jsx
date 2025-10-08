import { motion } from "framer-motion";

function TaskIcon({ src, onClick }) {
  return <motion.img whileHover={{ scale: 1.2, y: -2 }} src={src} className="task-icon" onClick={onClick} />;
}

export default TaskIcon;
