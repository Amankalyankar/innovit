// Reusable Button Component
import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  icon = null,
  className = ''
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const fullWidthClass = fullWidth ? 'btn-full' : '';
  const disabledClass = (disabled || loading) ? 'btn-disabled' : '';

  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${sizeClass} ${fullWidthClass} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="btn-loader"></span>
      ) : (
        <>
          {icon && <span className="btn-icon">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

export default Button;
