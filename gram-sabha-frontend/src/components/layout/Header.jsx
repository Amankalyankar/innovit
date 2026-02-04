// Header Component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { logout as apiLogout } from '../../api/mockApi';
import Button from '../ui/Button';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    await apiLogout();
    logout();
    navigate('/login');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  const getRoleName = () => {
    if (user.role === 'villager') return t('villager.portal');
    if (user.role === 'sarpanch') return t('sarpanch.portal');
    if (user.role === 'admin') return t('admin.portal');
    return user.role;
  };

  const userName = i18n.language === 'hi' && user.nameHi ? user.nameHi : user.name;

  return (
    <header className="header glass-card">
      <div className="header-container">
        {/* Logo & Title */}
        <div className="header-brand">
          <div className="header-logo">🏘️</div>
          <div className="header-info">
            <h1 className="header-title">{t('app.name')}</h1>
            <p className="header-subtitle">{getRoleName()}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="header-actions">
          {/* Language Toggle */}
          <button className="header-action-btn" onClick={toggleLanguage} title="Change Language">
            {i18n.language === 'en' ? '🇮🇳 हिं' : '🇬🇧 EN'}
          </button>

          {/* Profile Menu */}
          <div className="header-profile">
            <button 
              className="header-profile-btn"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="profile-avatar">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="profile-name">{userName}</span>
            </button>

            {showProfileMenu && (
              <div className="profile-dropdown glass-card animate-fade-in-down">
                <div className="profile-dropdown-header">
                  <p className="profile-dropdown-name">{userName}</p>
                  <p className="profile-dropdown-role">{user.role}</p>
                </div>
                <div className="profile-dropdown-divider"></div>
                <button className="profile-dropdown-item">
                  👤 {t('user.profile')}
                </button>
                <button className="profile-dropdown-item">
                  ⚙️ {t('nav.settings')}
                </button>
                <div className="profile-dropdown-divider"></div>
                <button 
                  className="profile-dropdown-item profile-dropdown-logout"
                  onClick={handleLogout}
                >
                  🚪 {t('common.logout')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
