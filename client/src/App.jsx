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
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/projects"
        element={<Projects />}
      />

      <Route
        path="/projects/:id"
        element={
    <ProtectedRoute>
      <ProjectDetails />
    </ProtectedRoute>
        }
      />

      <Route path="/tasks" element={<Tasks />} />

      <Route path="*" element={<NotFound />} />
    
    </Routes>
  );
}


export default App;