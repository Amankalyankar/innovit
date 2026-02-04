// Raise Complaint Page - Villager Portal
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { submitComplaint } from '../../api/mockApi';
import { issueCategories } from '../../data/demoComplaints';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import './RaiseComplaint.css';

const RaiseComplaint = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    mohalla: user.mohalla || 'Ward 1'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await submitComplaint({
        ...formData,
        submittedBy: user.id,
        submittedByName: user.name,
        village: user.village,
        priority: 'medium'
      });
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/villager/view-complaints');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <MainLayout>
        <div className="success-message animate-scale-in">
          <Card glass className="success-card">
            <div className="success-content">
              <div className="success-icon">✅</div>
              <h2>{t('messages.complaintSubmitted')}</h2>
              <p>{t('complaints.viewDetails')}</p>
            </div>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="raise-complaint-page">
        <div className="page-header">
          <h2 className="page-title">📝 {t('complaints.raiseNew')}</h2>
          <p className="page-subtitle">{t('villager.raiseIssue')}</p>
        </div>

        <Card glass className="complaint-form-card">
          <form onSubmit={handleSubmit} className="complaint-form">
            {/* Category Selection */}
            <div className="form-group">
              <label className="form-label">{t('complaints.selectCategory')}</label>
              <div className="category-grid">
                {issueCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`category-card ${formData.category === cat.id ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, category: cat.id }))}
                  >
                    <span className="category-icon">{cat.icon}</span>
                    <span className="category-name">
                      {i18n.language === 'hi' ? cat.nameHi : cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mohalla */}
            <div className="form-group">
              <label className="form-label">{t('complaints.selectMohalla')}</label>
              <select
                name="mohalla"
                value={formData.mohalla}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="Ward 1">Ward 1 / वार्ड 1</option>
                <option value="Ward 2">Ward 2 / वार्ड 2</option>
                <option value="Ward 3">Ward 3 / वार्ड 3</option>
              </select>
            </div>

            {/* Title */}
            <div className="form-group">
              <label className="form-label">{t('complaints.enterTitle')}</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
                placeholder="Brief description of the issue"
                required
                maxLength={100}
              />
              <span className="char-count">{formData.title.length}/100</span>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">{t('complaints.enterDescription')}</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Provide detailed information about the issue..."
                required
                rows={6}
                maxLength={500}
              />
              <span className="char-count">{formData.description.length}/500</span>
            </div>

            {/* Photo Upload (Placeholder) */}
            <div className="form-group">
              <label className="form-label">{t('complaints.attachPhoto')}</label>
              <div className="photo-upload-placeholder">
                📷 Photo upload will be integrated with backend
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="form-actions">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/villager/dashboard')}
              >
                {t('common.cancel')}
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={!formData.category || !formData.title || !formData.description}
              >
                {t('complaints.submitComplaint')}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default RaiseComplaint;
