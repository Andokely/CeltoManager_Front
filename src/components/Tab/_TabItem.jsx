import React from 'react';

function _TabItem({ isActive, icon, label, onClick, isDisabled }) {
  const baseClass = `inline-flex items-center px-4 py-3 rounded-lg w-full transition-all duration-300 ease-in transform`;

  const baseStyle = {
    backgroundColor: isDisabled
      ? 'var(--primary-4)'
      : isActive
        ? 'var(--primary-4)'
        : 'var(--primary-3)',
    color: isDisabled ? 'var(--primary-3)' : 'inherit',
    scale: isActive ? '1.1' : '1',
    boxShadow: isActive ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
  };

  return (
    <button
      className={baseClass}
      style={baseStyle}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
    >
      <span className="me-2">{icon}</span>
      {label}
    </button>
  );
}

export default _TabItem;
