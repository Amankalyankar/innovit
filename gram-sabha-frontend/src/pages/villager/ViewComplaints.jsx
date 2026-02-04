// View Complaints Page - Villager Portal
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { fetchComplaints, voteOnComplaint } from '../../api/mockApi';
import { getCategoryIcon, getStatusName, getStatusColor } from '../../data/demoComplaints';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import './ViewComplaints.css';

const ViewComplaints = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const result = await fetchComplaints();
      if (result.success) {
        setComplaints(result.data);
      }
    } catch (error) {
      console.error('Error loading complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (complaintId) => {
    try {
      const result = await voteOnComplaint(complaintId, user.id);
      if (result.success) {
        // Update local state
        setComplaints(prev => prev.map(c => 
          c.id === complaintId ? result.data : c
        ));
        if (selectedComplaint?.id === complaintId) {
          setSelectedComplaint(result.data);
        }
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const filteredComplaints = complaints.filter(c => {
    if (filter === 'my') return c.submittedBy === user.id;
    if (filter === 'voting') return c.status === 'UNDER_VOTING';
    if (filter === 'escalated') return c.status === 'ESCALATED' || c.status === 'IN_PROGRESS';
    return true;
  });

  const hasVoted = (complaint) => complaint.votedBy?.includes(user.id);

  return (
    <MainLayout>
      <div className="view-complaints-page">
        <div className="page-header">
          <h2 className="page-title">👀 {t('nav.viewComplaints')}</h2>
          <p className="page-subtitle">{t('villager.communityIssues')}</p>
        </div>

        {/* Filters */}
        <Card glass className="filters-card">
          <div className="filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              {t('complaints.allComplaints')}
            </button>
            <button 
              className={`filter-btn ${filter === 'my' ? 'active' : ''}`}
              onClick={() => setFilter('my')}
            >
              {t('complaints.myComplaints')}
            </button>
            <button 
              className={`filter-btn ${filter === 'voting' ? 'active' : ''}`}
              onClick={() => setFilter('voting')}
            >
              {t('status.underVoting')}
            </button>
            <button 
              className={`filter-btn ${filter === 'escalated' ? 'active' : ''}`}
              onClick={() => setFilter('escalated')}
            >
              {t('status.escalated')}
            </button>
          </div>
        </Card>

        {/* Complaints List */}
        <div className="complaints-grid">
          {loading ? (
            <Card glass><div className="loading-state">Loading...</div></Card>
          ) : filteredComplaints.length === 0 ? (
            <Card glass><div className="empty-state">No complaints found</div></Card>
          ) : (
            filteredComplaints.map((complaint) => (
              <Card 
                key={complaint.id} 
                glass 
                hover 
                className="complaint-card"
                onClick={() => setSelectedComplaint(complaint)}
              >
                <div className="complaint-card-content">
                  <div className="complaint-header">
                    <span className="complaint-category-icon">
                      {getCategoryIcon(complaint.category)}
                    </span>
                    <span 
                      className="complaint-status-badge"
                      style={{ 
                        background: `${getStatusColor(complaint.status)}20`,
                        color: getStatusColor(complaint.status)
                      }}
                    >
                      {getStatusName(complaint.status, i18n.language)}
                    </span>
                  </div>
                  
                  <h3 className="complaint-card-title">
                    {i18n.language === 'hi' && complaint.titleHi ? complaint.titleHi : complaint.title}
                  </h3>
                  
                  <p className="complaint-card-meta">
                    📍 {complaint.mohalla} • 👤 {complaint.submittedByName}
                  </p>
                  
                  <div className="complaint-card-footer">
                    <div className="vote-section">
                      <Button
                        size="sm"
                        variant={hasVoted(complaint) ? "primary" : "outline"}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!hasVoted(complaint)) handleVote(complaint.id);
                        }}
                        disabled={hasVoted(complaint)}
                      >
                        👍 {complaint.votes} {t('complaints.votes')}
                      </Button>
                    </div>
                    <span className="complaint-date">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Detail Modal */}
        {selectedComplaint && (
          <div className="modal-overlay" onClick={() => setSelectedComplaint(null)}>
            <Card glass className="complaint-detail-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedComplaint(null)}>✕</button>
              
              <div className="modal-header">
                <span className="modal-icon">{getCategoryIcon(selectedComplaint.category)}</span>
                <h2>{i18n.language === 'hi' && selectedComplaint.titleHi ? selectedComplaint.titleHi : selectedComplaint.title}</h2>
              </div>

              <div className="modal-body">
                <div className="detail-row">
                  <strong>{t('complaints.status')}:</strong>
                  <span style={{ color: getStatusColor(selectedComplaint.status) }}>
                    {getStatusName(selectedComplaint.status, i18n.language)}
                  </span>
                </div>
                <div className="detail-row">
                  <strong>{t('complaints.location')}:</strong>
                  <span>{selectedComplaint.mohalla}, {selectedComplaint.village}</span>
                </div>
                <div className="detail-row">
                  <strong>{t('complaints.submittedBy')}:</strong>
                  <span>{selectedComplaint.submittedByName}</span>
                </div>
                <div className="detail-row">
                  <strong>{t('complaints.votes')}:</strong>
                  <span>{selectedComplaint.votes}</span>
                </div>
                
                <div className="detail-description">
                  <strong>{t('complaints.description')}:</strong>
                  <p>{i18n.language === 'hi' && selectedComplaint.descriptionHi ? selectedComplaint.descriptionHi : selectedComplaint.description}</p>
                </div>

                {selectedComplaint.progress && (
                  <div className="progress-section">
                    <strong>{t('complaints.progress')}: {selectedComplaint.progress.percentage}%</strong>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${selectedComplaint.progress.percentage}%` }}
                      ></div>
                    </div>
                    <div className="progress-updates">
                      {selectedComplaint.progress.updates.map((update, idx) => (
                        <div key={idx} className="update-item">
                          <span className="update-date">{new Date(update.date).toLocaleDateString()}</span>
                          <span className="update-message">
                            {i18n.language === 'hi' ? update.messageHi : update.message}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ViewComplaints;
