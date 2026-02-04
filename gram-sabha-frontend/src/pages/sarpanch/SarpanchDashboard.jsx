// Sarpanch Dashboard - simplified version import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import MainLayout from '../../components/layout/MainLayout';
import '../villager/VillagerDashboard.css';

const SarpanchDashboard = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const userName = i18n.language === 'hi' && user.nameHi ? user.nameHi : user.name;

  return (
    <MainLayout>
      <div className="dashboard">
        <div className="dashboard-welcome">
          <h2 className="dashboard-title">{t('dashboard.welcome')}, {userName}! 👋</h2>
          <p className="dashboard-subtitle">{t('sarpanch.portal')}</p>
        </div>

        <div className="dashboard-stats">
          <Card glass hover className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{background: 'rgba(217, 118, 66, 0.1)', color: 'var(--color-accent-orange)'}}>⏳</div>
              <div className="stat-info">
                <p className="stat-label">{t('sarpanch.pendingReview')}</p>
                <h3 className="stat-value">12</h3>
              </div>
            </div>
          </Card>

          <Card glass hover className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{background: 'var(--color-primary-soft)', color: 'var(--color-primary)'}}>🏗️</div>
              <div className="stat-info">
                <p className="stat-label">{t('status.inProgress')}</p>
                <h3 className="stat-value">8</h3>
              </div>
            </div>
          </Card>

          <Card glass hover className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{background: 'var(--color-primary-soft)', color: 'var(--color-primary)'}}>✅</div>
              <div className="stat-info">
                <p className="stat-label">{t('complaints.resolved')}</p>
                <h3 className="stat-value">45</h3>
              </div>
            </div>
          </Card>

          <Card glass hover className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{background: 'rgba(201, 169, 97, 0.1)', color: 'var(--color-accent-gold)'}}>💰</div>
              <div className="stat-info">
                <p className="stat-label">{t('transparency.utilizationRate')}</p>
                <h3 className="stat-value">78%</h3>
              </div>
            </div>
          </Card>
        </div>

        <Card glass title={t('dashboard.overview')}>
          <p style={{color: 'var(--text-secondary)', marginTop: 0}}>
            Performance: 4.2/5 | Avg Response: 2.3 days
          </p>
          <p style={{color: 'var(--text-primary)'}}>
            Manage escalated complaints, assign contractors, and track budget utilization from the navigation menu.
          </p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SarpanchDashboard;
