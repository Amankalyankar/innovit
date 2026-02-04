// Villager Dashboard
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { fetchDashboardStats, fetchComplaints } from '../../api/mockApi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import MainLayout from '../../components/layout/MainLayout';
import { getCategoryIcon, getStatusName } from '../../data/demoComplaints';
import './VillagerDashboard.css';

const VillagerDashboard = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const statsResult = await fetchDashboardStats('villager', user.id);
      const complaintsResult = await fetchComplaints();
      
      if (statsResult.success) setStats(statsResult.data);
      if (complaintsResult.success) setRecentComplaints(complaintsResult.data.slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const userName = i18n.language === 'hi' && user.nameHi ? user.nameHi : user.name;

  return (
    <MainLayout>
      <div className="dashboard">
        {/* Welcome Section */}
        <div className="dashboard-welcome">
          <h2 className="dashboard-title">
            {t('dashboard.welcome')}, {userName}! 👋
          </h2>
          <p className="dashboard-subtitle">
            {t('villager.portal')}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="dashboard-stats">
          <Card glass hover className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{background: 'var(--color-primary-soft)', color: 'var(--color-primary)'}}>
                📝
              </div>
              <div className="stat-info">
                <p className="stat-label">{t('complaints.myComplaints')}</p>
                <h3 className="stat-value">{stats?.myComplaints || 0}</h3>
              </div>
            </div>
          </Card>

          <Card glass hover className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{background: 'rgba(217, 118, 66, 0.1)', color: 'var(--color-accent-orange)'}}>
                👍
              </div>
              <div className="stat-info">
                <p className="stat-label">{t('complaints.activeVotes')}</p>
                <h3 className="stat-value">{stats?.activeVotes || 0}</h3>
              </div>
            </div>
          </Card>

          <Card glass hover className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{background: 'var(--color-primary-soft)', color: 'var(--color-primary)'}}>
                ✅
              </div>
              <div className="stat-info">
                <p className="stat-label">{t('complaints.resolved')}</p>
                <h3 className="stat-value">{stats?.resolved || 0}</h3>
              </div>
            </div>
          </Card>

          <Card glass hover className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{background: 'rgba(201, 169, 97, 0.1)', color: 'var(--color-accent-gold)'}}>
                🏘️
              </div>
              <div className="stat-info">
                <p className="stat-label">{t('complaints.allComplaints')}</p>
                <h3 className="stat-value">{stats?.totalCommunityComplaints || 0}</h3>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card glass title={t('dashboard.quickActions')} className="quick-actions-card">
          <div className="quick-actions">
            <Button 
              variant="primary" 
              icon="📝"
              onClick={() => navigate('/villager/raise-complaint')}
            >
              {t('complaints.raiseNew')}
            </Button>
            <Button 
              variant="secondary"
              icon="👀"
              onClick={() => navigate('/villager/view-complaints')}
            >
              {t('nav.viewComplaints')}
            </Button>
            <Button 
              variant="outline"
              icon="🔍"
              onClick={() => navigate('/villager/transparency')}
            >
              {t('nav.transparency')}
            </Button>
          </div>
        </Card>

        {/* Recent Complaints */}
        <Card glass title={t('dashboard.recentActivity')} className="recent-activity-card">
          {loading ? (
            <div className="loading-state">Loading...</div>
          ) : (
            <div className="complaints-list">
              {recentComplaints.map((complaint) => (
                <div key={complaint.id} className="complaint-item animate-fade-in">
                  <div className="complaint-icon">
                    {getCategoryIcon(complaint.category)}
                  </div>
                  <div className="complaint-content">
                    <h4 className="complaint-title">
                      {i18n.language === 'hi' && complaint.titleHi ? complaint.titleHi : complaint.title}
                    </h4>
                    <p className="complaint-meta">
                      {complaint.mohalla} • {complaint.votes} {t('complaints.votes')}
                    </p>
                  </div>
                  <div className="complaint-status">
                    <span 
                      className="status-badge"
                      style={{background: `${getStatusName(complaint.status)}20`, color: getStatusName(complaint.status)}}
                    >
                      {getStatusName(complaint.status, i18n.language)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default VillagerDashboard;
