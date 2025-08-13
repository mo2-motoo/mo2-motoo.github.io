import { useState } from "react";
import { Link } from "react-router-dom";
import { usePostContext } from "../contexts/PostContext";
import { Plus, Menu, X, Settings } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isGitHubConnected } = usePostContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <i className="fas fa-rocket"></i>
            <span>Motoo Tech</span>
          </Link>

          <nav className={`nav-menu ${isMenuOpen ? "nav-menu-open" : ""}`}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              홈
            </Link>
            <Link to="/architecture" onClick={() => setIsMenuOpen(false)}>
              아키텍처
            </Link>
            <Link to="/domain" onClick={() => setIsMenuOpen(false)}>
              도메인
            </Link>
            <Link to="/implementation" onClick={() => setIsMenuOpen(false)}>
              구현
            </Link>
            <Link to="/testing" onClick={() => setIsMenuOpen(false)}>
              테스트
            </Link>
            <Link to="/troubleshooting" onClick={() => setIsMenuOpen(false)}>
              문제해결
            </Link>
            <Link
              to="/editor"
              className="btn btn-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              <Plus size={16} />새 포스트
            </Link>
          </nav>

          {/* GitHub 연결 상태 표시 */}
          <div className="github-status">
            {isGitHubConnected ? (
              <span className="status-connected" title="GitHub에 연결됨">
                ✅ GitHub
              </span>
            ) : (
              <Link to="/settings" className="github-settings-link">
                <Settings size={16} />
                GitHub 설정
              </Link>
            )}
          </div>

          <button className="nav-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};
