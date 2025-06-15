import { Outlet, Link } from "react-router-dom";

function MainLayoutAuth() {
  return (
    <div className="main-layout">
      <header className="header">
        <h2>Authentication</h2>
        <nav>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </nav>
      </header>

      <main className="main-content">
        <Outlet /> {/* Renders login/register */}
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} MyApp</p>
      </footer>
    </div>
  );
}

export default MainLayoutAuth;
