import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

function Nav() {
  const [lightMode, setLightMode] = useState(localStorage.getItem("mode") ? JSON.parse(localStorage.getItem("mode")) : false);

  useEffect(() => {
    lightMode ? document.body.classList.add("light") : document.body.classList.remove("light");
    localStorage.setItem("mode", lightMode);
  }, [lightMode]);

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">
        <img src="/macideas/logo.png" /> MacIdeas
      </Link>
      <Link to="/tasks" className="nav-link">
        Tasks
      </Link>
      <Link to="/notes" className="nav-link">
        Notes
      </Link>
      <motion.img
        whileHover={{ scale: 1.2, rotate: 360 }}
        whileTap={{ scale: 1.1, rotate: 320 }}
        transition={{ duration: 0.7, type: "spring" }}
        src="/macideas/icons/mode.svg"
        title="Toggle light mode"
        className="nav-img"
        onClick={() => setLightMode(!lightMode)}
      />{" "}
      <motion.img
        whileHover={{ scale: 1.2, rotate: 360 }}
        whileTap={{ scale: 1.1, rotate: 320 }}
        transition={{ duration: 0.7, type: "spring" }}
        src="/macideas/icons/github.svg"
        title="Source code"
        className="nav-img"
        onClick={() => window.open("https://github.com/Mac-Web/macideas", "_blank")}
      />
    </nav>
  );
}

export default Nav;
