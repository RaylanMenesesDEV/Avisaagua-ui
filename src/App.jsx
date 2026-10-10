import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { verificarAutenticacao } from "./services/auth.service";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feedback";

function RotaProtegida({ children }) {
  const [autenticado, setAutenticado] = useState(null);

  useEffect(() => {
    let ativo = true;

    async function validarSessao() {
      const valido = await verificarAutenticacao();

      if (ativo) {
  if (!valido) {
    localStorage.removeItem("avisaagua_token");
    localStorage.removeItem("avisaagua_usuario_logado");
  }

  setAutenticado(valido);
}
    }

    validarSessao();

    return () => {
      ativo = false;
    };
  }, []);

  if (autenticado === null) {
    return <p>Verificando autenticação...</p>;
  }

  if (!autenticado) {
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