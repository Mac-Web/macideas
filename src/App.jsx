import { HashRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
