import { motion } from "framer-motion";

function Card({ name, type }) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.05,
      }}
      className="card"
    >
      <h3 className="card-type">{type}</h3>
      <h2 className="card-name">{name}</h2>
    </motion.div>
  );
}

export default Card;
