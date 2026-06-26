import { useState } from 'react';
import { Outlet, useLocation, useNavigate, Navigate } from 'react-router';
import {
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  MessageSquare,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const navItems = [
  { label: 'Tableau de Bord', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Produits', path: '/admin/products', icon: ShoppingBag },
  { label: 'Commandes', path: '/admin/orders', icon: ClipboardList },
  { label: 'Témoignages', path: '/admin/testimonials', icon: MessageSquare },
  { label: 'FAQ', path: '/admin/faqs', icon: HelpCircle },
  { label: 'Paramètres', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const { isAdminLoggedIn, adminLogout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const pageTitle = navItems.find((item) => item.path === location.pathname)?.label || 'Admin';

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">Artisana</div>
        <nav className="admin-sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <a
                key={item.path}
                href={item.path}
                className={`admin-sidebar-link ${isActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
              >
                <Icon size={18} />
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="admin-sidebar-footer">
          <button
            className="admin-sidebar-link"
            onClick={handleLogout}
            style={{ width: '100%' }}
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      {isMobileSidebarOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 99,
            }}
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <aside
            className="admin-sidebar open"
            style={{ zIndex: 100 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div className="admin-sidebar-logo" style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>Artisana</div>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                style={{ color: 'var(--warm-sand)', background: 'none', border: 'none' }}
              >
                <X size={24} />
              </button>
            </div>
            <nav className="admin-sidebar-nav">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    className={`admin-sidebar-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.path);
                      setIsMobileSidebarOpen(false);
                    }}
                  >
                    <Icon size={18} />
                    {item.label}
                  </a>
                );
              })}
            </nav>
            <div className="admin-sidebar-footer">
              <button className="admin-sidebar-link" onClick={handleLogout} style={{ width: '100%' }}>
                <LogOut size={18} />
                Déconnexion
              </button>
            </div>
          </aside>
        </>
      )}

      <div className="admin-content">
        <div className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: 'var(--deep-charcoal)',
                padding: '8px',
              }}
              className="mobile-menu-btn"
            >
              <Menu size={24} />
            </button>
            <h1 className="admin-topbar-title">{pageTitle}</h1>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--text-muted)',
            }}
          >
            {new Date().toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </div>
        </div>
        <div className="admin-page">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
