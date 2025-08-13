export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <i className="fas fa-rocket"></i>
            <span>Motoo Tech Blog</span>
          </div>
          <div className="footer-links">
            <a
              href="https://github.com/mo2-motoo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>
            <a href="mailto:team@motoo.com">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Motoo Team. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
