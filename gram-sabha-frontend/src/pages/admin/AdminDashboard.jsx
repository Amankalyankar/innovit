// Admin Dashboard - simplified version
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import MainLayout from '../../components/layout/MainLayout';
import '../villager/VillagerDashboard.css';

const AdminDashboard = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const userName = i18n.language === 'hi' && user.nameHi ? user.nameHi : user.name;

  return (
    <MainLayout>
      <div className="dashboard">
        <div className="dashboard-welcome">
          <h2 className="dashboard-title">{t('dashboard.welcome')}, {userName}! 👋</h2>
          <p className="dashboard-subtitle">{t('admin.portal')}</p>
        </div>

        <div className="dashboard-stats">
          <Card glass hover className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{background: 'var(--color-primary-soft)', color: 'var(--color-primary)'}}>👥</div>
              <div className="stat-info">
                <p className="stat-label">{t('admin.totalUsers')}</p>
                <h3 className="stat-value">13</h3>
              </div>
            </div>
          </Card>

          <Card glass hover className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{background: 'rgba(217, 118, 66, 0.1)', color: 'var(--color-accent-orange)'}}>📋</div>
              <div className="stat-info">
                <p className="stat-label">{t('complaints.totalComplaints')}</p>
                <h3 className="stat-value">10</h3>
              </div>
            </div>
          </Card>

          <Card glass hover className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{background: 'var(--color-primary-soft)', color: 'var(--color-primary)'}}>🏘️</div>
              <div className="stat-info">
                <p className="stat-label">{t('admin.villages')}</p>
                <h3 className="stat-value">1</h3>
              </div>
            </div>
          </Card>

          <Card glass hover className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{background: 'rgba(201, 169, 97, 0.1)', color: 'var(--color-accent-gold)'}}>💚</div>
              <div className="stat-info">
                <p className="stat-label">{t('admin.platformHealth')}</p>
                <h3 className="stat-value">Good</h3>
              </div>
            </div>
          </Card>
        </div>

        <Card glass title={t('admin.systemOverview')}>
          <p style={{color: 'var(--text-primary)'}}>
            Platform is running smoothly. Manage users, configure village settings, and view comprehensive analytics from the navigation menu.
          </p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
