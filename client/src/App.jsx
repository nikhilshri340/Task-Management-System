import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import ProjectDetails from "./pages/ProjectDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

<Route
  path="/register"
  element={<Register />}
/>

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/projects"
  element={
    <ProtectedRoute>
      <Projects />
    </ProtectedRoute>
  }
/>

<Route
  path="/tasks"
  element={
    <ProtectedRoute>
      <Tasks />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
}


export default App;