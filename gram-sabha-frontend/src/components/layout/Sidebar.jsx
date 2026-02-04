// Sidebar Navigation Component
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  // Navigation items based on role
  const getNavItems = () => {
    if (user.role === 'villager') {
      return [
        { path: '/villager/dashboard', icon: '📊', label: t('nav.dashboard') },
        { path: '/villager/raise-complaint', icon: '📝', label: t('nav.raiseComplaint') },
        { path: '/villager/view-complaints', icon: '👀', label: t('nav.viewComplaints') },
        { path: '/villager/transparency', icon: '🔍', label: t('nav.transparency') },
      ];
    } else if (user.role === 'sarpanch') {
      return [
        { path: '/sarpanch/dashboard', icon: '📊', label: t('nav.dashboard') },
        { path: '/sarpanch/manage-complaints', icon: '📋', label: t('nav.manageComplaints') },
        { path: '/sarpanch/budget', icon: '💰', label: t('nav.budgetManager') },
        { path: '/sarpanch/progress', icon: '📈', label: t('nav.progressTracker') },
      ];
    } else if (user.role === 'admin') {
      return [
        { path: '/admin/dashboard', icon: '📊', label: t('nav.dashboard') },
        { path: '/admin/users', icon: '👥', label: t('nav.userManagement') },
        { path: '/admin/villages', icon: '🏘️', label: t('nav.villageManagement') },
        { path: '/admin/analytics', icon: '📈', label: t('nav.analytics') },
      ];
    }
    return [];
  };

  const navItems = getNavItems();

  return (
    <aside className="sidebar glass-card">
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
