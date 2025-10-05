import { motion } from "framer-motion";
import "./Home.css";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  return (
    <motion.div initial={{ opacity: 0, y: 200 }} animate={{ opacity: 1, y: 0 }}>
      <div className="hero">
        <h1 className="hero-title">Welcome back!</h1>
        <p className="hero-description">Select a file below to get started.</p>
      </div>
      <div className="cards">
        <Card name="MacVG todo" type="Tasks" />
        <Card name="Shopping list" type="Tasks" />
        <Card name="Meeting notes" type="Note" />
      </div>
      <Footer />
    </motion.div>
  );
}

export default Home;
