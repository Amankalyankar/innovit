// Admin User Management Page
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchAllUsers, updateUserRole } from '../../api/mockApi';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import './UserManagement.css';

const UserManagement = () => {
  const { t, i18n } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await fetchAllUsers();
      if (result.success) {
        setUsers(result.data);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const result = await updateUserRole(userId, newRole);
      if (result.success) {
        setUsers(prev => prev.map(u => 
          u.id === userId ? result.data : u
        ));
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const filteredUsers = users.filter(u => {
    if (filter === 'all') return true;
    return u.role === filter;
  });

  const villagerCount = users.filter(u => u.role === 'villager').length;
  const sarpanchCount = users.filter(u => u.role === 'sarpanch').length;
  const adminCount = users.filter(u => u.role === 'admin').length;

  return (
    <MainLayout>
      <div className="user-management-page">
        <div className="page-header">
          <h2 className="page-title">👥 {t('nav.userManagement')}</h2>
          <p className="page-subtitle">{t('admin.manageUsers')}</p>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <Card glass hover className="stat-mini-card">
            <div className="mini-stat">
              <span className="mini-stat-label">👨‍🌾 {t('villager.portal')}</span>
              <span className="mini-stat-value">{villagerCount}</span>
            </div>
          </Card>
          <Card glass hover className="stat-mini-card">
            <div className="mini-stat">
              <span className="mini-stat-label">🧑‍⚖️ {t('sarpanch.portal')}</span>
              <span className="mini-stat-value">{sarpanchCount}</span>
            </div>
          </Card>
          <Card glass hover className="stat-mini-card">
            <div className="mini-stat">
              <span className="mini-stat-label">👨‍💼 {t('admin.portal')}</span>
              <span className="mini-stat-value">{adminCount}</span>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card glass className="filters-card">
          <div className="filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              {t('admin.allUsers')} ({users.length})
            </button>
            <button 
              className={`filter-btn ${filter === 'villager' ? 'active' : ''}`}
              onClick={() => setFilter('villager')}
            >
              👨‍🌾 {t('villager.portal')} ({villagerCount})
            </button>
            <button 
              className={`filter-btn ${filter === 'sarpanch' ? 'active' : ''}`}
              onClick={() => setFilter('sarpanch')}
            >
              🧑‍⚖️ {t('sarpanch.portal')} ({sarpanchCount})
            </button>
            <button 
              className={`filter-btn ${filter === 'admin' ? 'active' : ''}`}
              onClick={() => setFilter('admin')}
            >
              👨‍💼 {t('admin.portal')} ({adminCount})
            </button>
          </div>
        </Card>

        {/* Users Table */}
        <Card glass>
          {loading ? (
            <div className="loading-state">Loading users...</div>
          ) : (
            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>{t('user.name')}</th>
                    <th>{t('user.username')}</th>
                    <th>{t('user.role')}</th>
                    <th>{t('user.village')}</th>
                    <th>{t('user.occupation')}</th>
                    <th>{t('common.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">
                            {user.name.charAt(0)}
                          </div>
                          <span>{i18n.language === 'hi' && user.nameHi ? user.nameHi : user.name}</span>
                        </div>
                      </td>
                      <td>{user.username}</td>
                      <td>
                        <span className={`role-badge role-${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{user.village || '-'}</td>
                      <td>
                        {i18n.language === 'hi' && user.occupationHi ? user.occupationHi : user.occupation || '-'}
                      </td>
                      <td>
                        <select
                          className="role-select"
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        >
                          <option value="villager">Villager</option>
                          <option value="sarpanch">Sarpanch</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default UserManagement;
