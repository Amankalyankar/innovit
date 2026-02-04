// Login Page with Premium Design
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { login as apiLogin } from '../api/mockApi';
import Button from '../components/ui/Button';
import './Login.css';

const Login = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await apiLogin(formData.username, formData.password);
      if (result.success) {
        login(result.user);
        
        // Redirect based on role
        if (result.user.role === 'villager') {
          navigate('/villager/dashboard');
        } else if (result.user.role === 'sarpanch') {
          navigate('/sarpanch/dashboard');
        } else if (result.user.role === 'admin') {
          navigate('/admin/dashboard');
        }
      } else {
        setError(result.error || t('auth.loginError'));
      }
    } catch (err) {
      setError(t('auth.loginError'));
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      
      <div className="login-content">
        {/* Language Switcher */}
        <button className="language-toggle" onClick={toggleLanguage}>
          {i18n.language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
        </button>

        {/* Login Card */}
        <div className="login-card glass-card animate-scale-in">
          {/* Logo & Title */}
          <div className="login-header">
            <div className="login-logo">🏘️</div>
            <h1 className="login-title">{t('app.name')}</h1>
            <p className="login-tagline">{t('app.tagline')}</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                {t('auth.username')}
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-input"
                placeholder="villager1"
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                {t('auth.password')}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="form-group-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>{t('auth.rememberMe')}</span>
              </label>
            </div>

            {error && (
              <div className="login-error animate-fade-in">
                ⚠️ {error}
              </div>
            )}

            <Button 
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              {t('auth.loginButton')}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="demo-credentials">
            <p className="demo-title">Demo Credentials:</p>
            <div className="demo-list">
              <div className="demo-item">
                <strong>Villager:</strong> villager1 / demo123
              </div>
              <div className="demo-item">
                <strong>Sarpanch:</strong> sarpanch1 / demo123
              </div>
              <div className="demo-item">
                <strong>Admin:</strong> admin / admin123
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="login-footer">
          <p>
            {t('footer.madeWith')} ❤️ {t('footer.inIndia')} | 
            <span style={{ marginLeft: '8px' }}>Hackathon 2026</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
