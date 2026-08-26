import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feedback";

function RotaProtegida({ children }) {
  const usuario = localStorage.getItem("avisaagua_usuario_logado");

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
      <div className="app-background">
        <main className="app-container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route
              path="/dashboard"
              element={
                <RotaProtegida>
                  <Dashboard />
                </RotaProtegida>
              }
            />
            <Route
              path="/feedback"
              element={
                <RotaProtegida>
                  <Feedback />
                </RotaProtegida>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
  );
}

export default App;