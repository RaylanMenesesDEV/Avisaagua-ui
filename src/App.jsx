
import { useEffect, useState } from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Páginas do AvisaÁgua
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feedback";
import DetalhesAviso from "./pages/DetalhesAviso";

// Serviço de autenticação
import { verificarAutenticacao } from "./services/auth.service";

// Componente responsável por proteger as rotas
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
    <Routes>
      {/* Página de login */}
      <Route
        path="/"
        element={<Login />}
      />

      {/* Página de cadastro */}
      <Route
        path="/cadastro"
        element={<Cadastro />}
      />

      {/* Dashboard protegido */}
      <Route
        path="/dashboard"
        element={
          <RotaProtegida>
            <Dashboard />
          </RotaProtegida>
        }
      />

      {/* Feedback protegido */}
      <Route
        path="/feedback"
        element={
          <RotaProtegida>
            <Feedback />
          </RotaProtegida>
        }
      />

      {/* Detalhes de um aviso público */}
      <Route
        path="/avisos/:id"
        element={
          <RotaProtegida>
            <DetalhesAviso />
          </RotaProtegida>
        }
      />

      {/* Redirecionar rotas inexistentes */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;
