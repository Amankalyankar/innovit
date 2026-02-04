// Transparency Page - Villager Portal
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchVillageBudgetSummary, fetchBudgetData, fetchContractors } from '../../api/mockApi';
import { formatCurrency } from '../../data/demoBudget';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import './Transparency.css';

const Transparency = () => {
  const { t, i18n } = useTranslation();
  const [villageBudget, setVillageBudget] = useState(null);
  const [budgetDetails, setBudgetDetails] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransparencyData();
  }, []);

  const loadTransparencyData = async () => {
    try {
      const [budgetResult, detailsResult, contractorsResult] = await Promise.all([
        fetchVillageBudgetSummary(),
        fetchBudgetData(),
        fetchContractors()
      ]);

      if (budgetResult.success) setVillageBudget(budgetResult.data);
      if (detailsResult.success) setBudgetDetails(detailsResult.data);
      if (contractorsResult.success) setContractors(contractorsResult.data);
    } catch (error) {
      console.error('Error loading transparency data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="loading-state">Loading transparency data...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="transparency-page">
        <div className="page-header">
          <h2 className="page-title">🔍 {t('transparency.title')}</h2>
          <p className="page-subtitle">{villageBudget?.village} - FY {villageBudget?.financialYear}</p>
        </div>

        {/* Budget Summary Cards */}
        <div className="budget-summary-grid">
          <Card glass hover className="budget-card">
            <div className="budget-card-content">
              <div className="budget-icon" style={{background: 'var(--color-primary-soft)', color: 'var(--color-primary)'}}>
                💰
              </div>
              <div>
                <p className="budget-label">{t('transparency.totalBudget')}</p>
                <h3 className="budget-value">
                  {formatCurrency(villageBudget?.totalAllocated || 0)}
                </h3>
              </div>
            </div>
          </Card>

          <Card glass hover className="budget-card">
            <div className="budget-card-content">
              <div className="budget-icon" style={{background: 'rgba(217, 118, 66, 0.1)', color: 'var(--color-accent-orange)'}}>
                📊
              </div>
              <div>
                <p className="budget-label">{t('transparency.utilized')}</p>
                <h3 className="budget-value">
                  {formatCurrency(villageBudget?.totalSpent || 0)}
                </h3>
              </div>
            </div>
          </Card>

          <Card glass hover className="budget-card">
            <div className="budget-card-content">
              <div className="budget-icon" style={{background: 'var(--color-primary-soft)', color: 'var(--color-primary)'}}>
                💵
              </div>
              <div>
                <p className="budget-label">{t('transparency.remaining')}</p>
                <h3 className="budget-value">
                  {formatCurrency((villageBudget?.totalAllocated || 0) - (villageBudget?.totalSpent || 0))}
                </h3>
              </div>
            </div>
          </Card>

          <Card glass hover className="budget-card">
            <div className="budget-card-content">
              <div className="budget-icon" style={{background: 'rgba(201, 169, 97, 0.1)', color: 'var(--color-accent-gold)'}}>
                📈
              </div>
              <div>
                <p className="budget-label">{t('transparency.utilizationRate')}</p>
                <h3 className="budget-value">
                  {villageBudget?.utilizationRate?.toFixed(2)}%
                </h3>
              </div>
            </div>
          </Card>
        </div>

        {/* Category Breakdown */}
        <Card glass title={t('transparency.budgetBreakdown')}>
          <div className="category-breakdown">
            {villageBudget?.categories && Object.entries(villageBudget.categories).map(([key, data]) => {
              const percentage = (data.spent / data.allocated * 100).toFixed(1);
              return (
                <div key={key} className="category-item">
                  <div className="category-info">
                    <span className="category-name">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <span className="category-amount">
                      {formatCurrency(data.spent)} / {formatCurrency(data.allocated)}
                    </span>
                  </div>
                  <div className="category-progress">
                    <div className="category-progress-bar">
                      <div 
                        className="category-progress-fill"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="category-percentage">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Active Projects */}
        <Card glass title={`${t('transparency.expenses')} (${budgetDetails.length})`}>
          <div className="projects-list">
            {budgetDetails.map((budget) => (
              <div key={budget.id} className="project-item">
                <div className="project-header">
                  <h4>{i18n.language === 'hi' && budget.titleHi ? budget.titleHi : budget.title}</h4>
                  <span className={`project-status project-status-${budget.status}`}>
                    {budget.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="project-budget">
                  <div className="budget-bar">
                    <div 
                      className="budget-bar-fill"
                      style={{ width: `${(budget.totalSpent / budget.totalAllocated * 100)}%` }}
                    ></div>
                  </div>
                  <div className="budget-details">
                    <span>{formatCurrency(budget.totalSpent)}</span>
                    <span className="budget-total">/ {formatCurrency(budget.totalAllocated)}</span>
                  </div>
                </div>
                {budget.breakdown && (
                  <div className="project-breakdown">
                    <div className="breakdown-item">
                      <span>{t('transparency.materials')}:</span>
                      <span>{budget.breakdown.materials?.length || 0} items</span>
                    </div>
                    <div className="breakdown-item">
                      <span>{t('transparency.labor')}:</span>
                      <span>{budget.breakdown.labor?.length || 0} workers</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Contractors */}
        <Card glass title={`${t('transparency.contractors')} (${contractors.length})`}>
          <div className="contractors-grid">
            {contractors.map((contractor) => (
              <div key={contractor.id} className="contractor-card">
                <div className="contractor-header">
                  <div className="contractor-avatar">
                    {contractor.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="contractor-name">
                      {i18n.language === 'hi' && contractor.nameHi ? contractor.nameHi : contractor.name}
                    </h4>
                    <p className="contractor-spec">
                      {i18n.language === 'hi' && contractor.specializationHi ? contractor.specializationHi : contractor.specialization}
                    </p>
                  </div>
                </div>
                <div className="contractor-stats">
                  <div className="contractor-stat">
                    <span>✅ {t('transparency.projects')}</span>
                    <strong>{contractor.completedProjects}</strong>
                  </div>
                  <div className="contractor-stat">
                    <span>⭐ {t('transparency.rating')}</span>
                    <strong>{contractor.rating}/5</strong>
                  </div>
                  <div className="contractor-stat">
                    <span>💰 {t('transparency.expenses')}</span>
                    <strong>{formatCurrency(contractor.totalEarned)}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Transparency;
