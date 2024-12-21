import React, { useState } from "react";

const _Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || null);

  return (
    <div>
      <div className="border-b animate-slideInRight px-4" style={{ borderColor: 'var(--primary-3)' }}>
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" style={{ color: 'var(--text-color)' }}>
          {tabs.map((tab) => (
            <li key={tab.id} className="me-2">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center justify-center gap-2 p-4 border-b-2 rounded-t-lg ${activeTab === tab.id
                    ? "text-blue-600 border-blue-600"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300"
                  }`}
              >
                {tab.icon && <tab.icon size={20} />}
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        {tabs.find((tab) => tab.id === activeTab)?.content || (
          <div>Onglet inconnu</div>
        )}
      </div>
    </div>
  );
};

export default _Tabs;
