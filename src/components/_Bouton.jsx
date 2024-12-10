import React from 'react';
import PropTypes from 'prop-types';

export const _BtnText = ({
  text,
  onClick = null,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon = null,
  iconPosition = 'left'
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 my-3 rounded-md bg-blue-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {Icon && iconPosition === 'left' && <Icon className="mr-2" />}
      {text}
      {Icon && iconPosition === 'right' && <Icon className="ml-2" />}
    </button>
  );
};

_BtnText.propTypes = {
  text: PropTypes.string.isRequired, 
  onClick: PropTypes.func, 
  type: PropTypes.oneOf(['button', 'submit', 'reset']), 
  disabled: PropTypes.bool, 
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger']), 
  size: PropTypes.oneOf(['sm', 'md', 'lg']), 
  className: PropTypes.string, 
  icon: PropTypes.elementType, 
  iconPosition: PropTypes.oneOf(['left', 'right']), 
};

export const _BtnIcon = ({
  onClick = null,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon
}) => {
  const baseStyles = 'inline-flex items-center z-40 justify-center rounded-full transition-colors duration-300 ease-in-out';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-900 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-900 focus:ring-gray-500',
    success: 'bg-green-600 text-white hover:bg-green-900 focus:ring-red-500',
    danger: 'bg-red-600 text-white hover:bg-red-900 focus:ring-red-500',
  };

  const sizeStyles = {
    sm: 'w-8 h-8', // Small button size
    md: 'w-10 h-10', // Medium button size
    lg: 'w-12 h-12', // Large button size
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />} {/* Adjust icon size if needed */}
    </button>
  );
};

_BtnIcon.propTypes = {
  onClick: PropTypes.func, // Fonction appelée lors du clic sur le bouton
  type: PropTypes.oneOf(['button', 'submit', 'reset']), // Type de bouton (button, submit, reset)
  disabled: PropTypes.bool, // Bouton désactivé ou non
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger']), // Style du bouton
  size: PropTypes.oneOf(['sm', 'md', 'lg']), // Taille du bouton
  className: PropTypes.string, // Classes CSS supplémentaires
  icon: PropTypes.elementType.isRequired, // Composant d'icône (un élément React), obligatoire ici
};

export const _BtnIconeED = ({ onClick, width, height, Icon, fill }) => {
  return (
    <button
      onClick={onClick}
      className="px-3 rounded-lg py-2"
      style={{
        backgroundColor: 'var(--bg-color)',
        borderColor: 'var(--border-color)',
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    >
      {Icon && <Icon width={width} height={height} fill={fill} />}
    </button>
  );
};

_BtnIconeED.propTypes = {
  onClick: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  Icon: PropTypes.elementType.isRequired,
};


