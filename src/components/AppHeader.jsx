import { ChevronLeft, Droplets } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AppHeader({
  title,
  subtitle,
  showBack = true,
  showLogo = true,
}) {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="header-top">
        {showBack ? (
          <button
            className="header-icon"
            onClick={() => navigate(-1)}
            aria-label="Voltar"
          >
            <ChevronLeft size={21} />
          </button>
        ) : (
          <div className="header-spacer" />
        )}

        {showLogo && (
          <div className="header-logo">
            <Droplets size={15} fill="currentColor" />
            <span>AVISAÁGUA</span>
          </div>
        )}

        <div className="header-spacer" />
      </div>

      <div className="header-content">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </header>
  );
}

export default AppHeader;