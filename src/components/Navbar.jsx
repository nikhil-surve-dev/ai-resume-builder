import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          The Precision Architect
        </Link>

        {/* Nav Links */}
        <nav>
          <ul className="navbar-nav">
            <li>
              <Link to="/" className={isHome ? 'active' : ''}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/" className="">
                Resumes
              </Link>
            </li>
            <li>
              <Link to="/results" className={!isHome ? 'active' : ''}>
                Analysis
              </Link>
            </li>
            <li>
              <a href="#">Templates</a>
            </li>
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          <button className="btn-icon" title="Notifications" aria-label="Notifications">
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>notifications</span>
          </button>
          <button className="btn-icon" title="Settings" aria-label="Settings">
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>settings</span>
          </button>
          <Link to="/" className="btn-primary" style={{ textDecoration: 'none' }}>
            Create New
          </Link>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--secondary), var(--primary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.8rem',
              flexShrink: 0,
            }}
          >
            PA
          </div>
        </div>
      </div>
    </header>
  )
}
