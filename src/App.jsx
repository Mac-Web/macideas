import { HashRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";
import Nav from "./components/Nav";

function App() {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:id" element={<Tasks />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
