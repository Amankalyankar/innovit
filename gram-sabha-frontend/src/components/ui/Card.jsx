// Reusable Card Component with Glassmorphism
import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  title,
  subtitle,
  glass = false, 
  hover = true,
  padding = 'md',
  className = '',
  onClick,
  header = null,
  footer = null
}) => {
  const baseClass = 'card';
  const glassClass = glass ? 'glass-card' : '';
  const hoverClass = hover ? 'card-hover' : '';
  const paddingClass = `card-padding-${padding}`;
  const clickableClass = onClick ? 'card-clickable' : '';

  return (
    <div 
      className={`${baseClass} ${glassClass} ${hoverClass} ${paddingClass} ${clickableClass} ${className}`}
      onClick={onClick}
    >
      {(title || subtitle || header) && (
        <div className="card-header">
          {header || (
            <>
              {title && <h3 className="card-title">{title}</h3>}
              {subtitle && <p className="card-subtitle">{subtitle}</p>}
            </>
          )}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
