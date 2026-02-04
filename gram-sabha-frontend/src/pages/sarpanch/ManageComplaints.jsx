// Manage Complaints Page - Sarpanch Portal
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchComplaints, assignContractor, fetchContractors } from '../../api/mockApi';
import { getCategoryIcon, getStatusName, getStatusColor } from '../../data/demoComplaints';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import '../villager/ViewComplaints.css';
import './ManageComplaints.css';

const ManageComplaints = () => {
  const { t, i18n } = useTranslation();
  const [complaints, setComplaints] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [complaintsResult, contractorsResult] = await Promise.all([
        fetchComplaints(),
        fetchContractors()
      ]);
      
      if (complaintsResult.success) setComplaints(complaintsResult.data);
      if (contractorsResult.success) setContractors(contractorsResult.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignContractor = async (complaintId, contractorId) => {
    try {
      const result = await assignContractor(complaintId, contractorId);
      if (result.success) {
        setComplaints(prev => prev.map(c => 
          c.id === complaintId ? result.data : c
        ));
        setSelectedComplaint(null);
      }
    } catch (error) {
      console.error('Error assigning contractor:', error);
    }
  };

  const filteredComplaints = complaints.filter(c => {
    if (filter === 'pending') return c.status === 'ESCALATED';
    if (filter === 'inProgress') return c.status === 'IN_PROGRESS';
    if (filter === 'completed') return c.status === 'RESOLVED';
    return true;
  });

  const pendingCount = complaints.filter(c => c.status === 'ESCALATED').length;
  const inProgressCount = complaints.filter(c => c.status === 'IN_PROGRESS').length;
  const completedCount = complaints.filter(c => c.status === 'RESOLVED').length;

  return (
    <MainLayout>
      <div className="manage-complaints-page">
        <div className="page-header">
          <h2 className="page-title">📋 {t('nav.manageComplaints')}</h2>
          <p className="page-subtitle">{t('sarpanch.complaintOverview')}</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-row">
          <Card glass hover className="stat-mini-card">
            <div className="mini-stat">
              <span className="mini-stat-label">{t('sarpanch.pendingReview')}</span>
              <span className="mini-stat-value">{pendingCount}</span>
            </div>
          </Card>
          <Card glass hover className="stat-mini-card">
            <div className="mini-stat">
              <span className="mini-stat-label">{t('status.inProgress')}</span>
              <span className="mini-stat-value">{inProgressCount}</span>
            </div>
          </Card>
          <Card glass hover className="stat-mini-card">
            <div className="mini-stat">
              <span className="mini-stat-label">{t('complaints.resolved')}</span>
              <span className="mini-stat-value">{completedCount}</span>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card glass className="filters-card">
          <div className="filters">
            <button 
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              ⏳ {t('sarpanch.pendingReview')} ({pendingCount})
            </button>
            <button 
              className={`filter-btn ${filter === 'inProgress' ? 'active' : ''}`}
              onClick={() => setFilter('inProgress')}
            >
              🏗️ {t('status.inProgress')} ({inProgressCount})
            </button>
            <button 
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              ✅ {t('complaints.resolved')} ({completedCount})
            </button>
          </div>
        </Card>

        {/* Complaints List */}
        <div className="complaints-grid">
          {loading ? (
            <Card glass><div className="loading-state">Loading...</div></Card>
          ) : filteredComplaints.length === 0 ? (
            <Card glass><div className="empty-state">No complaints in this category</div></Card>
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
                    📍 {complaint.mohalla} • 👍 {complaint.votes} votes
                  </p>
                  
                  {complaint.assignedTo && (
                    <p className="assigned-info">
                      ⚙️ {t('sarpanch.assignedTo')}: {complaint.assignedToName}
                    </p>
                  )}
                  
                  {complaint.budgetAllocated && (
                    <p className="budget-info">
                      💰 Budget: ₹{complaint.budgetAllocated.toLocaleString()}
                    </p>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Action Modal */}
        {selectedComplaint && (
          <div className="modal-overlay" onClick={() => setSelectedComplaint(null)}>
            <Card glass className="complaint-detail-modal action-modal" onClick={(e) => e.stopPropagation()}>
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
                  <strong>{t('complaints.votes')}:</strong>
                  <span>{selectedComplaint.votes}</span>
                </div>
                <div className="detail-row">
                  <strong>{t('complaints.location')}:</strong>
                  <span>{selectedComplaint.mohalla}</span>
                </div>

                {/* Assign Contractor Section */}
                {selectedComplaint.status === 'ESCALATED' && (
                  <div className="assign-section">
                    <h3>{t('sarpanch.assignContractor')}</h3>
                    <div className="contractors-list">
                      {contractors.map((contractor) => (
                        <div key={contractor.id} className="contractor-option">
                          <div className="contractor-info">
                            <strong>
                              {i18n.language === 'hi' && contractor.nameHi ? contractor.nameHi : contractor.name}
                            </strong>
                            <p>
                              {i18n.language === 'hi' && contractor.specializationHi ? contractor.specializationHi : contractor.specialization}
                            </p>
                            <p className="contractor-stats-small">
                              ⭐ {contractor.rating}/5 • ✅ {contractor.completedProjects} projects
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handleAssignContractor(selectedComplaint.id, contractor.id)}
                          >
                            {t('common.assign')}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedComplaint.assignedTo && (
                  <div className="assigned-contractor-info">
                    <strong>{t('sarpanch.assignedContractor')}:</strong>
                    <p>{selectedComplaint.assignedToName}</p>
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

export default ManageComplaints;
