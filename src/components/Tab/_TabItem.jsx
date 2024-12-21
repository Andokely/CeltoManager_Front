import React from 'react';

function _TabItem({ isActive, icon, label, onClick, isDisabled }) {
  const baseClass = `inline-flex items-center px-4 py-3 rounded-lg w-full`;

  const baseStyle = {
    backgroundColor: isDisabled
      ? 'var(--primary-4)'
      : isActive
      ? 'var(--primary-4)'
      : 'var(--primary-3)',
    color: isDisabled ? 'var(--primary-3)' : 'inherit',
  };

  return (
    <button
      className={baseClass} style={baseStyle}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
    >
      <span className="me-2">{icon}</span>
      {label}
    </button>
  );
}

export default _TabItem;
