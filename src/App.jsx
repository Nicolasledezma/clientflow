import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Pipeline from "./pages/Pipeline";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/clients"
            element={<Clients />}
          />

          <Route
            path="/pipeline"
            element={<Pipeline />}
          />

          <Route
            path="/tasks"
            element={<Tasks />}
          />

          <Route
            path="/calendar"
            element={<Calendar />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
            
            
          />
          <Route
            path="/settings"
            element={<Settings />}
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;