import React, { useState } from 'react';
import _TabItem from './_TabItem';

function _TabGroup({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="md:flex flex-col p-4">
      <ul className="flex space-x-3 text-sm font-medium md:me-4 mb-4 md:mb-0" style={{ color: 'var(--text-color)' }}>
        {tabs.map((tab, index) => (
          <li key={index}>
            <_TabItem
              isActive={activeTab === index}
              icon={tab.icon}
              label={tab.label}
              onClick={() => setActiveTab(index)}
              isDisabled={tab.disabled}
            />
          </li>
        ))}
      </ul>
      <div className="px-6 py-2 mt-2 text-medium rounded-lg w-full" style={{ color: 'var(--text-color)', backgroundColor : 'var(--primary-5)' }}>
        <h3 className="text-lg font-bold mb-2">
          {tabs[activeTab].title}
        </h3>
        <hr className='border' style={{ borderColor : 'var(--primary-1)' }} />
        <p>{tabs[activeTab].content}</p>
      </div>
    </div>
  );
}

export default _TabGroup;
